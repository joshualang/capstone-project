const nextVaccinations = require('./nextVaccinations')
const dbFormatter = require('./dbFormatter')

module.exports = function updateVaccinations(dbData) {
  dbData.vaccinationsOpen = nextVaccinations(dbFormatter(dbData))
  return dbData
}
