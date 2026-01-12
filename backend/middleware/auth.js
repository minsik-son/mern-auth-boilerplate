// auth middleware
const { User } = require('../models/users');

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.x_auth;
        if (!token) {
            return res.status(401).json({ success: false, message: 'Auth failed, no token' });
        }

        // Verify token and find user
        const user = await User.findByToken(token);
        if (!user) {
            return res.status(401).json({ success: false, message: 'Auth failed, user not found' });
        }

        // Attach user and token to request object
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Auth failed, invalid token' });
    }
};

module.exports = { auth };