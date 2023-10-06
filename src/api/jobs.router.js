const express = require('express');

const authenticate = require('../middleware/authenticate');
const { createJob, getAllJobs } = require('../controllers/jobs.controller');

const jobRouter = express.Router();

jobRouter.get('/', getAllJobs);

jobRouter.use(authenticate);
jobRouter.post('/', createJob);

module.exports = jobRouter;