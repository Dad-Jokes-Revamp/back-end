const db = require('../data/dbConfig');

module.exports = {
    get,
    add,
    getJokes,
    addJokes,
    removeJoke,
    getJokesById,
    editJoke
};

function get() {
    return db('jokes');
}

function getJokesById(id) {
    return db("jokes")
        .where({ id: id })
        .first();
}

function add(joke) {
    return db('jokes').insert(joke);
}

function getJokes(id) {
    return db('jokes')
}

function addJokes(jokesObj) {
    return db('jokes')
        .insert(jokesObj)
        .then(id => {
            return db('jokes')
                .where({ id: id[0] })
                .first();
        });
}

function removeJoke(id) {
    return db('jokes')
        .where({ id: id })
        .first()
        .del()
        .then(count => {
            return getJokes().then(jokes => {
                return jokes;
            })
        })
}

function editJoke(changes, id) {
    return db('jokes')
        .where({ id })
        .update(changes, '*')
};

