// auth middleware
const { User } = require('../models/users');

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.x_auth;
        if (!token) {
            return res.status(401).json({ success: false, message: 'Auth failed, no token' });
        }

        const user = await User.findByToken(token);
        if (!user) {
            return res.status(401).json({ success: false, message: 'Auth failed, user not found' });
        }

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Auth failed, invalid token' });
    }
};

module.exports = { auth };