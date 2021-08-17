const express = require('express');
const router = express.Router();

const {
  getAllTasks,
  createNewTasks,
  changeTaskInfo,
  deleteTask
} = require('../controllers/task.controller.js');

router.get('/allTasks', getAllTasks);
router.post('/createTask', createNewTasks);
router.patch('/updateTask', changeTaskInfo);
router.delete('/deleteTask', deleteTask);

module.exports = router;