const jwt = require("jsonwebtoken");

module.exports = function generateToken(user) {
    const payload = {
        subject: user.id,
        email: user.email
    };

    const options = {
        expiresIn: "1d"
    };

    return jwt.sign(payload, process.env.SECRET || 'it be a secret', options);
};