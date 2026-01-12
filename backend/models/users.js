const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    }
})

// Encrypt password before saving the user document data
userSchema.pre('save', async function(next) { 
    if (!this.isModified('password')) return;
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
        return next(err);
    }
});

// Compare the plain password with the encrypted password
userSchema.methods.comparePassword = async function(plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
};

// Generate jwt token
userSchema.methods.generateToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id.toHexString() }, process.env.JWT_SECRET, { expiresIn: '10m' });
    user.token = token;
    await user.save();
    return token;
}

// Clear token when user logout
userSchema.methods.clearToken = async function() {
    const user = this;
    user.token = "";
    await user.save();
    return;
}

// Find user using decoded token
userSchema.statics.findByToken = async function(token) {
    const User = this;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return await User.findOne({ "_id": decoded._id, "token": token });
    } catch (err) {
        return Promise.reject(err);
    }
}

const User = mongoose.model('User', userSchema)
module.exports = { User };
