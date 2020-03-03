const Auth = require('../users/users-model');

module.exports = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json('Please provide a Email and password');
    } else {
        Auth.findByUser({ email })
            .first()
            .then(user => {
                console.log(user);
                if (user) {
                    res.status(400).json('Email already exists, please try another');
                } else {
                    next();
                }
            })
            .catch(error => {
                res.status(500).json(error, 'Error registering user')
            });
    }
}