const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const { auth } = require('./middleware/auth');
const userRouter = require('./routers/userRouter');
const { User } = require('./models/users');
const authRouter = require('./routers/authRouter');

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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

// User routes
app.use('/user', userRouter);
app.use('/auth', authRouter);

// Start the server
app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
});



