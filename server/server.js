const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('../auth/auth-router');
const jokesRouter = require('../jokes/jokes-router');

const restricted = require('../auth/restricted-middleware');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Dad Jokes API' });
});

server.use('/auth', authRouter);
server.use('/jokes', restricted, jokesRouter);

module.exports = server;