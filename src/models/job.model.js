const mongoose = require('mongoose');

const JobSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Job must have a title"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Job must have a description'],
        trim: true
    }
});

module.exports = mongoose.model('Job', JobSchema);