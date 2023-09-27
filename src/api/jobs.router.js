const express = require('express');

const { createJob, getAllJobs } = require('../controllers/jobs.controller');

const jobRouter = express.Router();

jobRouter.get('/', getAllJobs);

jobRouter.post('/', createJob);

module.exports = jobRouter;