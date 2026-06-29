const express = require('express');
const router = express.Router();

const { addTask, getTasks, getTaskById, updateTask, deleteTask, taskStatus, getTasksByStatus, getTasksSortedByDueDate } = require('../controllers/taskController');

router.post('/', addTask);
router.get('/', getTasks);
router.get('/filter/:status', getTasksByStatus);
router.get('sorted/duedate', getTasksSortedByDueDate);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.patch('/:id', taskStatus);

module.exports = router;