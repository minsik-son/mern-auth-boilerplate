const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const User = require('./models/users');

dotenv.config();
const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('MongoDB Connected...');
}).catch(err => {
    console.log("MongoDB connection error:", err);
});

// Set server port
app.set('port', process.env.PORT || 8080);

// Basic route
app.get('/', (req, res) => {
    res.send('Main Page');
});

// User Registration Route
//Return 200 if success, else return 400 with err message
app.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        const userData = await user.save();
        return res.status(200).json({
            success: true,
            userData
        });
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            success: false,
            err: err.message
        });
    }
});

// User login route
app.post('/login', async (req, res) => {
    const typedEmail = req.body.email;
    const typedPassword = req.body.password;
    // Find email in database
    try {
        const user = await User.findOne({ email: typedEmail });
        if (!user) {
            return res.status(400).json({
                loginSuccess: false,
                message: "Cannot find email."
            })
        }
        // Compare password
        user.comparePassword(typedPassword, (err, isMatch) => {
            if (err) return res.status(400).json({ 
                loginSuccess: false, 
                err 
            });
            if (!isMatch) {
                return res.status(400).json({
                    loginSuccess: false,
                    message: "Incorrect password."
                })
            }
            return res.status(200).json({
                loginSuccess: true,
                message: "Login successful."
            });
        })
    }
    catch (err) {
        return res.status(400).json({ loginSuccess: false, err });
    }
})

app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
});



