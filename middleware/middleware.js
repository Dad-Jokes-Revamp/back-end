const Auth = require('../users/users-model');

module.exports = (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json('Please provide a username and password');
    } else {
        Auth.findByUser({ username })
            .first()
            .then(user => {
                console.log(user);
                if (user) {
                    res.status(400).json('Username already exists, please try another');
                } else {
                    next();
                }
            })
            .catch(error => {
                res.status(500).json(error, 'Error registering user')
            });
    }
}