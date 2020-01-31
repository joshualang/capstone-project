import express from 'express'
const router = express.Router()

const userController = require('../controllers/user')

router.get('/:user', userController.user_get_by_id)
router.post('/create', userController.user_create)
router.delete('/delete/:user', userController.user_delete_by_id)

module.exports = router
