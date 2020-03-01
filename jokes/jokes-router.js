const express = require('express');
const restricted = require('../auth/restricted-middleware');
const jokes = require('./jokes-model');

const router = express.Router();

router.get('/', (req, res) => {
    jokes
        .getJokes()
        .then(jokes => {
            res.status(200).json(jokes);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error getting jokes', err });
        })
});

router.post('/', restricted, (req, res) => {
    const { joke_title, joke_question, joke_answer } = req.body;
    if (joke_title && joke_question && joke_answer) {
        jokes
            .addJokes({ ...req.body, user_id: req.decodedJwt.subject })
            .then(jokesObj => {
                res.status(201).json(jokesObj);
            })
            .catch(err => {
                res.status(500).json({ message: 'Error adding joke', err });
            });
    } else {
        res.status(400).json({ message: 'Bad request, title, question, and answer required' });
    }
});

router.delete('/:id', restricted, async (req, res) => {
    try {
        const findJokes = await jokes
            .getJokesById(req.params.id)
            .then(jokesObj => {
                if (jokesObj) {
                    return jokesObj.user_id;
                }
            })
            .catch(err => {
                console.log(err);
            });

        if (findJokes === req.decodedJwt.subject) {
            jokes
                .removeJoke(req.params.id)
                .then(jokes => {
                    if (jokes) {
                        res.status(200).json(jokes);
                    } else {
                        res.status(404).json({
                            message: 'Joke does not exist'
                        });
                    }
                })
                .catch(err => {
                    res.status(500).json({ message: 'Error removing joke', err });
                });
        } else {
            res.status(400).json({ message: 'Error removing joke, either not authorized or joke does not exist' });
        }
    } catch (err) {
        console.log(err)
    }
})


module.exports = router;