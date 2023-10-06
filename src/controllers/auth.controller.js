const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

// @route POST api/auth/register
// @desc Register user
// @access Public
exports.register = (req, res) => {
    // Make sure this account doesn't already exist
    User.findOne({email: req.body.email})
        .then(async (user) => {

            if (user) return res.status(401).json({message: 'The email address you have entered is already associated with another account.'});

            // Create and save the user
            let resetToken = crypto.randomBytes(32).toString("hex");
            const userToken = await bcrypt.hash(resetToken, Number(10));

            const newUser = new User({ ...req.body, userToken });
            newUser.save()
                .then(user => {
                    return res.status(200).json({token: resetToken, userId: user._id, success: true, message: "Sign Up Successfull, and email has been sent for verification"})
                })
                .catch(err => {
                    res.status(500).json({message:err.message})
                });
        })
        .catch(err => res.status(500).json({success: false, message: err.message}));
};

// @route POST api/auth/login
// @desc Login user and return JWT token
// @access Public
exports.login = (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (!user) return res.status(401).json({msg: 'Incorrect email or password'});

            //validate password
            if (!user.comparePassword(req.body.password)) return res.status(401).json({message: 'Invalid email or password'});

            // check that email is verified
            if (!user.verified) return res.status(200).json({message: 'Please verify your email', success: true});

            // Login successful, write token, and send back user
            res.status(200).json({token: user.generateJWT(), user: user});
        })
        .catch(err => res.status(500).json({message: err.message}));
};

exports.requestResetToken = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        
        if (!user) return res.status(401).json({msg: 'if a user with this email address exists, we have sent a password reset link'});

        let resetToken = crypto.randomBytes(32).toString("hex");
        const tokenHash = await bcrypt.hash(resetToken, Number(10));

        user.userToken = tokenHash;
        // user.resetPasswordExpires = Date.now() + 3600000; expires in 1 hour

        await user.save();

        return res.status(200).json({success: true, resetToken, userId: user._id });
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const {email, token, password} = req.body;

        const user = await User.findOne({email: email});

        if (!user) {
            return res.status(404).json({ error: 'Invalid or expired token'});
        }

        const isValid = await bcrypt.compare(token, user.userToken);

        if(!isValid) {
            return res.status(404).json({ error: 'Invalid or expired token'});
        }

        user.password = password;
        user.userToken = '';

        await user.save();

        return res.status(201).json({ success: true, message: 'Password reset successfully'});

    } catch (error) {
        
    }
}

exports.verifyEmail = async (req, res) => {
    try {
        const { token, id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            console.log('got here');
            return res.status(404).json({success: false, message: "Invalid or expired token"});
        }

        const isValid = await bcrypt.compare(token, user.userToken);

        if (!isValid) {
            console.log('got here 2');
            return res.status(404).json({success: false, message: "Invalid or expired token"});
        }

        user.verified = true;
        await user.save();

        return res.status(201).json({ success: true, message: "Your email has been verified successfully"});
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}