const getVaccinationType = require('./getVaccinationType')
const toDateString = require('./toDateString')

module.exports = function userFormatter(userDbData) {
  userDbData.age = toDateString(userDbData.age)

  userDbData.vaccinationsOpen.map(item => {
    item.vaccinationType = getVaccinationType(item.vaccinationType)
    item.begins = toDateString(item.begins)
  })

  userDbData.vaccinationsMade.map(item => {
    item.vaccinationType = getVaccinationType(item.vaccinationType)
    item.date = toDateString(item.date)
    item.registrationDate = toDateString(item.registrationDate)
  })
  return userDbData
}
