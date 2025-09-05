const express = require('express')
const router = express.Router()
const tasksController = require('../controllers/tasksController')

router.post('/', tasksController.createTasks)
router.get('/:id', tasksController.getTask)

module.exports = router