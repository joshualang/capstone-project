const vaccinationRecommendations = require('../vaccinationRecommendations.json')

module.exports = function recommendations(settings) {
  console.log('recommendations settings', settings)
  const selectedRecommendations = vaccinationRecommendations.filter(
    item => settings[Object.keys(item)[0]]
  )
  // .filter(item => {
  //   console.log('Settings Keys', Object.keys(item)[0])
  //   console.log('condition', settings[Object.keys(item)[0]])
  //   //settings[Object.keys(item)[0]]
  //   true
  // })
  console.log('selectedRecommendations', selectedRecommendations)
  return selectedRecommendations
}
