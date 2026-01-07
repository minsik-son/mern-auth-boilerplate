const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

mongoose.connect(`mongodb+srv://mongoFullStack:${process.env.MONGODB_PASSWORD}@cluster0.9yeorpv.mongodb.net/?appName=Cluster0`).then(() => {
    console.log('MongoDB Connected...');
}).catch(err => {
    console.log("MongoDB connection error:", err);
});

app.set('port', process.env.PORT || 8080);

app.get ('/', (req, res) => {
    res.send('Hello Node.js and MongoDB');
});

app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
});



