const getVaccinationType = require('../getVaccinationType')
const toDateString = require('../Time/toDateString')

module.exports = function userFormatter(userDbData) {
  let data = { ...userDbData, age: toDateString(userDbData.age) }

  data.vaccinationsOpen.map(item => {
    item.vaccinationType = getVaccinationType(item.vaccinationType)
    item.begins = toDateString(item.begins)
  })

  data.vaccinationsMade.map(item => {
    item.vaccinationType = getVaccinationType(item.vaccinationType)
    item.date = toDateString(item.date)
    item.registrationDate = toDateString(item.registrationDate)
  })
  return data
}
