const knex = require('../data/dbConfig');

const usersDB = require('../users/users-model');

module.exports = {
    get: usersDB.get,
    add: usersDB.add,
    getByUsername,
};

function getByUsername(username) {
    return knex
        .select('*')
        .from('users')
        .where({ username });
}