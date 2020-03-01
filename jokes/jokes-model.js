const db = require('../data/dbConfig');

module.exports = {
    get,
    add,
    getJokes,
    addJokes,
    removeJoke,
    getJokesById,
    editJoke,
    getJokePosts,
    insert
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
}

function getJokePosts(id) {
    return db('jokes')
        .join('users', 'user_id', 'jokes.user_id')
        .select('jokes.id', 'jokes.text', 'users.name as postedBy')
        .where('jokes.user_id', id)
}

function insert(user) {
    return db('jokes')
        .insert(user)
        .then(ids => {
            return getJokesById(ids[0]);
        });
}
