
const {validationResult} = require('express-validator');

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = {}; errors.array().map((err) => error[err.path] = err.msg);
        console.log('got here', errors, req.body);
        return res.status(422).json({error});
    }

    next();
};