const db = require('../data/dbConfig');

module.exports = {
    getUsers,
    add,
    findByUser
};

function getUsers() {
    return db('users');
}

function add(user) {
    return db('users').insert(user, 'id')
}

function findByUser(email) {
    return db('users')
        .where({ email: email })
        .first();
}