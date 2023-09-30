const User = require('../models/user.model');

const register = async (userInfo) => {

    try {
        const { email } = userInfo;
        const user = await User.findOne({ email });
    
        if (user) {
            throw new Error("The email address already exists");
        }
    
        const newUser = await User.create(userInfo);
        return {status: 200, token: newUser.generateJWT(), user: newUser};
    } catch (error) {
        console.log("error", error);
        throw new Error(error.message);
    }
};

const login = (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (!user) return res.status(401).json({msg: 'The email address ' + req.body.email + ' is not associated with any account. Double-check your email address and try again.'});

            //validate password
            if (!user.comparePassword(req.body.password)) return res.status(401).json({message: 'Invalid email or password'});

            // Login successful, write token, and send back user
            res.status(200).json({token: user.generateJWT(), user: user});
        })
        .catch(err => res.status(500).json({message: err.message}));
};

module.exports = {
    register,
    login
}