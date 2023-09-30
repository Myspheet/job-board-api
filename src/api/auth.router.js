const express = require('express');
const {body} = require('express-validator');
const Auth = require('../controllers/auth.controller');
const validate = require('../middleware/validate');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({message: "You are in the Auth Endpoint. Register or Login to test Authentication."});
});

router.post('/register', [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('username').not().isEmpty().withMessage('You username is required'),
    body('password').not().isEmpty().isLength({min: 6}).withMessage('Must be at least 6 chars long'),
    body('firstName').not().isEmpty().withMessage('You first name is required'),
    body('lastName').not().isEmpty().withMessage('You last name is required')
], validate, Auth.register);

router.post("/login", [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').not().isEmpty(),
], validate, Auth.login);

module.exports = router;