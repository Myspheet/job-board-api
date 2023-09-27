const JobModel = require('../models/job.model');

const create = async (data) => {
    try {
        const job = JobModel.create(data);
        return { success: true, job}
    } catch (error) {
        throw new Error('Could not create job');
    }
}

const fetchAll = async () => {
    try {
        const jobs = await JobModel.find({}, { '__v': 0 });
        return { success: true, jobs};
    } catch (error) {
        throw new Error('Could not fetch jobs');
    }
}



module.exports = {
    create,
    fetchAll
}