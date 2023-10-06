const cors = require('cors');
const express = require('express');
const passport = require('passport');
const jwtMiddleware = require("./middleware/jwt");

const apiRouter = require('./api/api.router');
const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
jwtMiddleware(passport);

app.use('/api/v1', apiRouter);

module.exports = app;
