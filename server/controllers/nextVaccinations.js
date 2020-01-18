const recommendations = require('./recommendationsHelper')
const uid = require('uid')
const setDateFromNow = require('./Time/setDateFromNow')
const dateToAgeInDays = require('./Time/dateToAgeInDays')
const onlyNextVaccination = require('./onlyNextVaccination')

module.exports = function nextVaccination(data) {
  const vaccinationsMade = data.vaccinationsMade

  let vaccinationsDue = []
  const userAgeInDays = dateToAgeInDays(data.age._seconds * 1000)
  recommendations(data.settings).forEach((disease, diseaseIndex) => {
    vaccinationsDue = [...vaccinationsDue, []]
    const diseaseName = Object.keys(disease)[0]
    const singleDisease = disease[diseaseName]

    singleDisease.forEach(item => {
      if (
        !vaccinationsMade.some(
          el => el.vaccinationType === item.vaccinationType
        ) &&
        userAgeInDays + 20 > item.beginsAtAgeInDays
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
