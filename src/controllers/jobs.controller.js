const { create, fetchAll } = require('../services/jobs.services');

const createJob = async (req, res) => {
    try {
        const job = await create(req.body);
        return res.status(201).json(job);
    } catch (error) {
        return res.status(500).json({ success: false, error });
    }
}

const getAllJobs = async (req, res) => {
    try {
        const jobs = await fetchAll();
        return res.status(200).json(jobs);
    } catch (error) {
        return res.status(500).json({ success: false, error });
    }
}

module.exports = {
    createJob,
    getAllJobs
}