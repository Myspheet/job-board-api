const express = require('express');

const apiRouter = require('./api/api.router');
const app = express();

app.use(express.json());

app.use('/api/v1', apiRouter);

module.exports = app;
