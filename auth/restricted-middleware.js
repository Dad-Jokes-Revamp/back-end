const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, process.env.SECRET || 'it be a secret', (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: "token invalid" });
            } else {
                console.log(decodedToken)
                req.decodedJwt = decodedToken;
                next();
            }
        });
    } else {
        res.status(401).json({ message: "invalid credentials" });
    }
};