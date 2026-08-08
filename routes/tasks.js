const express = require('express');
const router = express.Router();

const taskData = require('../task.json');

let tasks = taskData.tasks;


// Allowed priorities
const allowedPriorities = ['low', 'medium', 'high'];


// GET /tasks
// Get all tasks
// Filtering: ?completed=true
// Sorting: ?sort=asc / ?sort=desc
router.get('/', (req, res) => {

    let result = [...tasks];

    // -----------------------------
    // Filter by completed status
    // -----------------------------
    if (req.query.completed !== undefined) {

        const completed = req.query.completed;

        if (completed !== 'true' && completed !== 'false') {
            return res.status(400).json({
                message: 'completed must be true or false'
            });
        }

        const completedValue = completed === 'true';

        result = result.filter(
            task => task.completed === completedValue
        );
    }


    // -----------------------------
    // Sort by creation date
    // -----------------------------
    if (req.query.sort) {

        const sort = req.query.sort;

        if (sort !== 'asc' && sort !== 'desc') {
            return res.status(400).json({
                message: 'sort must be asc or desc'
            });
        }

        result.sort((a, b) => {

            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);

            return sort === 'asc'
                ? dateA - dateB
                : dateB - dateA;
        });
    }

    res.status(200).json(result);
});


// GET /tasks/priority/:level
// Get tasks by priority
router.get('/priority/:level', (req, res) => {

    const level = req.params.level.toLowerCase();

    if (!allowedPriorities.includes(level)) {
        return res.status(400).json({
            message: 'Priority must be low, medium, or high'
        });
    }

    const filteredTasks = tasks.filter(
        task => task.priority === level
    );

    res.status(200).json(filteredTasks);
});


// GET /tasks/:id
// Get task by ID
router.get('/:id', (req, res) => {

    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            message: 'Task ID must be a number'
        });
    }

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            message: 'Task not found'
        });
    }

    res.status(200).json(task);
});


// POST /tasks
// Create task
router.post('/', (req, res) => {

    const {
        title,
        description,
        completed,
        priority
    } = req.body;


    // Validate title
    if (typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({
            message: 'Title is required and cannot be empty'
        });
    }


    // Validate description
    if (
        typeof description !== 'string' ||
        description.trim() === ''
    ) {
        return res.status(400).json({
            message: 'Description is required and cannot be empty'
        });
    }


    // Validate completed
    if (typeof completed !== 'boolean') {
        return res.status(400).json({
            message: 'Completed must be a boolean value'
        });
    }


    // Validate priority
    if (!allowedPriorities.includes(priority)) {
        return res.status(400).json({
            message: 'Priority must be low, medium, or high'
        });
    }


    // Generate ID
    const newId = tasks.length > 0
        ? Math.max(...tasks.map(task => task.id)) + 1
        : 1;


    const newTask = {
        id: newId,
        title: title.trim(),
        description: description.trim(),
        completed,
        priority,
        createdAt: new Date().toISOString()
    };


    tasks.push(newTask);

    res.status(201).json(newTask);
});


// PUT /tasks/:id
// Update task
router.put('/:id', (req, res) => {

    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            message: 'Task ID must be a number'
        });
    }


    const taskIndex = tasks.findIndex(
        task => task.id === id
    );

    if (taskIndex === -1) {
        return res.status(404).json({
            message: 'Task not found'
        });
    }


    const {
        title,
        description,
        completed,
        priority
    } = req.body;


    // Validate title
    if (typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({
            message: 'Title is required and cannot be empty'
        });
    }


    // Validate description
    if (
        typeof description !== 'string' ||
        description.trim() === ''
    ) {
        return res.status(400).json({
            message: 'Description is required and cannot be empty'
        });
    }


    // Validate completed
    if (typeof completed !== 'boolean') {
        return res.status(400).json({
            message: 'Completed must be a boolean value'
        });
    }


    // Validate priority
    if (!allowedPriorities.includes(priority)) {
        return res.status(400).json({
            message: 'Priority must be low, medium, or high'
        });
    }


    tasks[taskIndex] = {
        ...tasks[taskIndex],
        title: title.trim(),
        description: description.trim(),
        completed,
        priority
    };


    res.status(200).json(tasks[taskIndex]);
});


// DELETE /tasks/:id
router.delete('/:id', (req, res) => {

    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            message: 'Task ID must be a number'
        });
    }


    const taskIndex = tasks.findIndex(
        task => task.id === id
    );

    if (taskIndex === -1) {
        return res.status(404).json({
            message: 'Task not found'
        });
    }


    const deletedTask = tasks.splice(taskIndex, 1);


    res.status(200).json({
        message: 'Task deleted successfully',
        task: deletedTask[0]
    });
});


module.exports = router;