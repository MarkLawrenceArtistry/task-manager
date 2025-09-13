const express = require('express')
const router = express.Router()
const statusController = require('../controllers/statusController')

router.post('/', statusController.createStatus)
router.get('/', statusController.getAllStatus)
router.get('/:id', statusController.getStatus)

router.put('/:id', statusController.updateStatus)
router.delete('/:id', statusController.deleteStatus)

module.exports = router