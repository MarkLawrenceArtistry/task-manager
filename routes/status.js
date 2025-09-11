const express = require('express')
const router = express.Router()
const statusController = require('../controllers/statusController')

router.post('/', statusController.createStatus)
router.get('/', statusController.getAllStatus)

router.put('/:id', statusController.updateStatus)
router.delete('/:id', statusController.deleteStatus)

module.exports = router