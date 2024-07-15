const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers['authtoken'];
    // console.log(req.headers)
    // console.log({token})
    if (!token) return res.status(401).json({ error: 'Access Denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid Token' });
    }
}

module.exports = { verifyToken };
