const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Task = require('../models/Task');
const mongoose = require('mongoose');

const { verifyToken } = require('../middleware/auth');

// Fetch tasks for the authenticated user
router.get('/tasks', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('tasks');
        // console.log(user);
        // console.log(user.tasks);
        res.json(user.tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a task for the authenticated user
router.post('/tasks', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const newTask = new Task({
            ...req.body,
            user: user._id
        });

        const savedTask = await newTask.save();

        user.tasks.unshift(savedTask._id);
        await user.save();

        res.status(201).json(savedTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a task for the authenticated user
router.put('/tasks/:taskId', verifyToken, async (req, res) => {
    try {
        const taskId = req.params.taskId;
        console.log(mongoose.Types.ObjectId.isValid(taskId));
        console.log(taskId);
        // const user = await User.findById(req.user.id);
        // console.log(user)
        const task = await Task.findOne({ id: taskId});
        console.log(task);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        Object.assign(task, req.body);
        await task.save();

        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a task for the authenticated user
router.delete('/tasks/:taskId', verifyToken, async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const user = await User.findById(req.user.id);

        const task = await Task.findOneAndDelete({ id: taskId});
        // console.log(task);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        user.tasks.pull(task._id);
        await user.save();

        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
