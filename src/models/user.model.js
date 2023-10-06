const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../config/config');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: 'Your email is required',
        trim: true
    },

    password: {
        type: String,
        required: 'Your password is required',
        max: 100
    },

    firstName: {
        type: String,
        required: 'First Name is required',
        max: 100
    },

    lastName: {
        type: String,
        required: 'Last Name is required',
        max: 100
    },

    userRole: {
        type: Number,
        required: true,
        default: 10,
        max: 255
    },

    verified: {
        type: Boolean,
        default: false
    },

    profileImage: {
        type: String,
        required: false,
        max: 255
    },

    userToken: {
        type: String,
        required: false
    },

    tokenExpires: {
        type: String,
        required: false
    },

    passwordChangedAt: {
        type: [Date],
        required: false
    }
}, {timestamps: true});


UserSchema.pre('save',  function(next) {
    const user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    let payload = {
        id: this._id,
        email: this.email,
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
    };

    return jwt.sign(payload, config.JWT_SECRET, {
        expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
    });
};

module.exports = mongoose.model('Users', UserSchema);