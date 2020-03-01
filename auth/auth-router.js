const router = require('express').Router();
const userDB = require('./auth-model');
const generateToken = require('./tokenGen');
const jwt = require('jsonwebtoken');
const validateUser = require('../middleware/middleware');
const bcrypt = require('bcryptjs');

router.post('/register', validateUser, (req, res) => {
    const user = ({ username, password } = req.body);

    bcrypt
        .hash(user.password, 8)
        .then((hash) => {
            user.password = hash;

            userDB
                .add(user)
                .then((newUser) => {
                    res.status(201).json({ userId: newUser[0], user: true });
                })
                .catch((error) => {
                    if (error.errno === 19) {
                        res.status(403).json({ message: 'Username already exists' });
                    } else {
                        res.status(500).json({ message: 'Error adding new user' });
                    }
                });
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error generating hash' })
        });
});

router.post('/login', validateUser, (req, res) => {
    const { password, username } = req.body;
    userDB
        .getByUsername(username)
        .first()
        .then(user => {
            if (user && bcrypt.compare(password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({
                    id: user.id,
                    user: true,
                    token: token
                })
            } else {
                res.status(400).json({ message: 'Invalid credentials' });
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Invalid username or password', err })
        })
})

router.get("/me", async (req, res) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, process.env.SECRET || 'it be a secret', (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: "token invalid" });
            } else {
                req.decodedJwt = decodedToken;
                res.json({ me: decodedToken });
            }
        });
    } else {
        res.json({ message: "provide a token" });
    }
});

module.exports = router;