const Task = require('../models/Task');

const addTask = async (req, res) => {
    try {
        if (Array.isArray(req.body)) {
            const tasks = await Task.insertMany(req.body);

            return res.status(201).json({
                message: `${tasks.length} tasks added successfully`,
                tasks
            });
        }

        const { title, description, dueDate } = req.body;
        const task = new Task({ title, description, dueDate });
        await task.save();

        return res.status(201).json({
            message: 'Task added successfully',
            task
        });
    }
    catch(error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

const getTasks = async (req, res) => {
    try {
        const { title } = req.query;
        
        if(!title) {
            const tasks = await Task.find();
            if(tasks.length === 0) {
                return res.status(404).json({
                    message: 'There are no tasks'
                });
            }
            return res.status(200).json(tasks);
        }

        const tasks = await Task.find({
            title: { $regex: title, $options: 'i' }
        });
        if(tasks.length === 0) {
            return res.status(404).json({
                message: `No tasks with title: ${title}`
            });
        }
        return res.status(200).json(tasks);
    }
    catch(error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id);
        if(!task) {
            return res.status(404).json({
                message: `There is no task with ID: ${id}`
            });
        }

        return res.status(200).json(task);
    }
    catch(error) {
        if(error.name === 'CastError') {
            return res.status(400).json({
                message: `Invalid ID`
            });
        }
        return res.status(500).json({
            message: error.message
        });
    }
}

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, dueDate } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(id, { title, description, dueDate }, { new: true });

        if(!updatedTask) {
            return res.status(404).json({
                message: `There is no task with ID: ${id}`
            });
        }

        return res.status(200).json({
            message: 'Task updated successfully',
            updatedTask
        });
    }
    catch(error) {
        if(error.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid ID'
            });
        }
        return res.status(500).json({
            message: error.message
        });
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTask = await Task.findByIdAndDelete(id);
        if(!deletedTask) {
            return res.status(404).json({
                message: `There is no task with ID: ${id}`
            });
        }

        return res.status(200).json({
            message: 'Task deleted successfully', 
            deletedTask
        });
    }
    catch(error) {
        if(error.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid ID'
            });
        }
        return res.status(500).json({
            message: error.message
        });
    }
}

const taskStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(id, { status }, { new: true });

        if(!updatedTask) {
            return res.status(404).json({
                message: `There is no task with ID: ${id}`
            });
        }

        return res.status(200).json({
            message: 'Task Completed',
            updatedTask
        });
    }
    catch(error) {
        if(error.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid ID'
            });
        }
        return res.status(500).json({
            message: error.message
        });
    }
}

const getTasksByStatus = async (req, res) => {
    try {
        const { status } = req.params;

        const tasks = await Task.find({
            status: status
        });

        if(tasks.length === 0) {
            return res.status(404).json({
                message: 'There are no tasks'
            });
        }

        return res.status(200).json(tasks);
    }
    catch(error) {
        if(error.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid ID'
            });
        }
        return res.status(500).json({
            message: error.message
        });
    }
}

const getTasksSortedByDueDate = async (req, res) => {
    try {
        const tasks = await Task.find().sort({
            dueDate: 1
        });

        if(tasks.length === 0) {
            return res.status(404).json({
                message: 'There are no tasks'
            });
        }

        return res.status(200).json(tasks);
    }
    catch(error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = { addTask, getTasks, getTaskById, updateTask, deleteTask, taskStatus, getTasksByStatus, getTasksSortedByDueDate };