const authController = (req, res)=> {
    res.status(200).json({
        success: true,
        data: {
            _id: req.user._id,
            isAdmin: req.user.role === 0 ? false : true,
            isAuth: true,
            email: req.user.email,
            name: req.user.name,
            role: req.user.role,
            createdAt: req.user.createdAt
        }
    });
}

module.exports = { authController };