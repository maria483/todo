const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    completed:{
        type: Boolean,
        required: false
    },
    date:{
        type: Date,
        required: false
    },
    description:{
        type: String,
        required: false
    }
}, {timestamps: true});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;