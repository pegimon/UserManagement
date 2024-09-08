const jwt = require('jsonwebtoken');
const config = require('../config');

const authValidation = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: "Unauthorized" });
    }
}

module.exports = authValidation;