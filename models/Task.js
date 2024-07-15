const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date, required: true },
    priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
    status: { type: String, enum: ['to-do', 'in-progress', 'completed'], required: true },
    history: [{
        date: { type: Date, required: true },
        action: { type: String, required: true }
    }],
    user : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required: true
    }
}, { _id: true });

module.exports = mongoose.model('Task', TaskSchema);