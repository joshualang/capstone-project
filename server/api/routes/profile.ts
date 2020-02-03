import express from 'express'
const router = express.Router()

const profileConttroller = require('../controllers/profile')

router.get('/:profile', profileConttroller.profile_get_by_id)
router.post('/create/:uid', profileConttroller.profile_create_with_user_id)
router.delete('/delete/:profile', profileConttroller.profile_delete_by_id)
router.patch('/settings/:profile', profileConttroller.profile_update_settings)
router.post(
  '/vaccinations/:profile',
  profileConttroller.profile_add_vaccination
)

module.exports = router
