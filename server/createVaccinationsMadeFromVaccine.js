const uid = require('uid')
const vaccinationRecommendations = require('./vaccinationRecommendations.json')
const toDateObject = require('./toDateObject')

module.exports = function createVaccinationsMadeFromVaccine(vaccine, request) {
  let newVaccinations = []
  vaccine.diseases.forEach(disease => {
    function vaccinationType() {
      const indexOfDisease = vaccinationRecommendations.findIndex(
        item => item[disease]
      )

      if (indexOfDisease >= 0) {
        return vaccinationRecommendations[indexOfDisease][disease].find(
          entry =>
            entry.beginsAtAgeInDays <
            (toDateObject(request.body.date).getTime() -
              toDateObject(request.body.userBirth).getTime()) /
              (1000 * 60 * 60 * 24) <
            entry.endsAtAgeInDays
        ).vaccinationType
      } else {
        return 'Impfung nicht zuruordnen'
      }
    }

    newVaccinations.push({
      date: toDateObject(request.body.date),
      disease: disease,
      doctor: request.body.doctor,
      id: uid(),
      registrationNumber: request.body.sticker,
      admittedApplicant: vaccine.admittedApplicant,
      description: vaccine.description,
      furtherInformation: vaccine.furtherInformation,
      name: vaccine.name,
      registrationDate: vaccine.registrationDate,
      vaccinationType: vaccinationType(),
    })
  })
  return newVaccinations
}
