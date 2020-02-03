import express from 'express'
const router = express.Router()

const userController = require('../controllers/user')

router.get('/:uid', userController.user_get_by_id)
router.post('/create/:uid', userController.user_create)
router.delete('/delete/:uid', userController.user_delete_by_id)

module.exports = router
