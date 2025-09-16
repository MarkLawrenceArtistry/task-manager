const express = require('express')
const router = express.Router()
const tasksController = require('../controllers/tasksController')

router.post('/', tasksController.createTask)
router.get('/', tasksController.getAllTasks)
router.get('/search', tasksController.searchTask)

router.get('/:id', tasksController.getTask)
router.put('/:id', tasksController.updateTask)
router.patch('/:id', tasksController.finishedTask)
router.delete('/:id', tasksController.deleteTask)

module.exports = router