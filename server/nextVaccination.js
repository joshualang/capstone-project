const vaccinationRecommendations = require('./vaccinationRecommendations.json')
const uid = require('uid')

module.exports = function nextVaccination(data) {
  const birthDate = data.age._seconds * 1000
  const vaccinationsMade = data.vaccinationsMade

  function toAgeInDays(birth) {
    const now = new Date().getTime()
    return Math.floor((now - birth) / (1000 * 60 * 60 * 24))
  }
  function setDate(days) {
    const nowInMilliseconds = new Date().getTime()
    const futureInMilliseconds = days * (1000 * 60 * 60 * 24)
    const timestamp = nowInMilliseconds + futureInMilliseconds
    return new Date(timestamp)
  }

  let vaccinationsDue = []
  const userAgeInDays = toAgeInDays(birthDate)
  vaccinationRecommendations
    .filter(item => data.settings[Object.keys(item)[0]] === true)
    .forEach((disease, diseaseIndex) => {
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
              begins: setDate(item.beginsAtAgeInDays - userAgeInDays),
              doctor: 'Vereinbare einen Termin',
              vaccinationType: item.vaccinationType,
            },
          ]
        }
      })
    })

  const vaccinationDue = vaccinationsDue
    .map(array => array[0])
    .filter(item => item != undefined)
    .sort((a, b) => a.begins - b.begins)

  console.log(vaccinationDue)
  data.vaccinationsOpen = vaccinationDue
  console.log(data)
  return data
}
