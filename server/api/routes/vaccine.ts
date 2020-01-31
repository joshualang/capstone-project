import express from 'express'
const router = express.Router()

const vaccineController = require('../controllers/vaccine')

router.get('/', vaccineController.vaccine_get_all)
router.get('/:vaccine', vaccineController.vaccine_get_by_name)
router.post('/', vaccineController.vaccine_add)
router.delete('/:id', vaccineController.vaccine_delete_by_id)

module.exports = router
