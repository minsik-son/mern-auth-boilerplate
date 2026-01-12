const { User } = require('../models/users');

// User registration controller
const registerUser = async (req, res) => {
    try {
        const user = new User(req.body);
        if (!user.name || !user.email || !user.password) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and password are required."
            });
        }
        const userData = await user.save();
        return res.status(200).json({
            success: true,
            data: userData
        });
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
}


// User update controller
const updateUser = async (req, res) => {
    try { 
        const userId = req.user._id;
        const updateData = req.body;
        const userEmail = updateData.email;
        const userName = updateData.name;

        if (!userName || !userEmail) {
            return res.status(400).json({
                success: false,
                message: "Name and email are required."
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name: userName, email: userEmail },
            { new: true }
        );
        return res.status(200).json({
            success: true,
            data: updatedUser,
            message: "User updated successfully."
        });
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
}

// User delete controller
const deleteUser = async (req, res) => {
    try {
        const userId = req.user._id;
        await User.findByIdAndDelete(userId);
        return res.status(200).json({
            success: true,
            message: "User deleted successfully."
        });
    }
    catch (err) {
        console.error(err);
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
}


// User login controller
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Auth failed, email not found"
            });
        }

        // Compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Auth failed, wrong password"
            });
        }

        // Generate token
        const token = await user.generateToken();
        res.cookie("x_auth", token)
            .status(200)
            .json({
                success: true,
                data: {
                    userId: user._id
                }
            });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

// User logout controller
const logoutUser = async (req, res) => {
    try {
        await req.user.clearToken();
        res.clearCookie('x_auth');
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

module.exports = { registerUser, updateUser, deleteUser, loginUser, logoutUser };