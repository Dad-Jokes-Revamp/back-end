const knex = require('../data/dbConfig');

const usersDB = require('../users/users-model');

module.exports = {
    get: usersDB.get,
    add: usersDB.add,
    getByUsername,
};

function getByUsername(email) {
    return knex
        .select('*')
        .from('users')
        .where({ email });
}