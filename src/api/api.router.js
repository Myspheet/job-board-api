const express = require('express');

const jobRouter = require('./jobs.router');

const apiRouter = express.Router();


apiRouter.use('/jobs', jobRouter);

module.exports = apiRouter;