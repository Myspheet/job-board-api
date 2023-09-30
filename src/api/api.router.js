const express = require('express');

const jobRouter = require('./jobs.router');
const authRouter = require('./auth.router');

const apiRouter = express.Router();


apiRouter.use('/jobs', jobRouter);
apiRouter.use('/auth', authRouter);
module.exports = apiRouter;