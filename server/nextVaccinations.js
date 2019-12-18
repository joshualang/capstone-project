const recommendations = require('./recommendations')
const uid = require('uid')
const setDateFromNow = require('./setDateFromNow')
const dateToAgeInDays = require('./dateToAgeInDays')
const onlyNextVaccination = require('./onlyNextVaccination')

module.exports = function nextVaccination(data) {
  const vaccinationsMade = data.vaccinationsMade

  let vaccinationsDue = []
  const userAgeInDays = dateToAgeInDays(data.age)
  recommendations(data.settings).forEach((disease, diseaseIndex) => {
    vaccinationsDue = [...vaccinationsDue, []]
    const diseaseName = Object.keys(disease)[0]
    const singleDisease = disease[diseaseName]

    singleDisease.forEach(item => {
      if (
        !vaccinationsMade.some(
          el => el.vaccinationType === item.vaccinationType
        ) &&
        userAgeInDays + 90 > item.beginsAtAgeInDays
      ) {
        vaccinationsDue[diseaseIndex] = [
          ...vaccinationsDue[diseaseIndex],
          {
            id: uid(),
            disease: diseaseName,
            begins: setDateFromNow(item.beginsAtAgeInDays - userAgeInDays),
            doctor: 'Vereinbare einen Termin',
            vaccinationType: item.vaccinationType,
          },
        ]
      }
    })
  })

  return onlyNextVaccination(vaccinationsDue)
}
