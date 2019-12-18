const vaccinationRecommendations = require('./vaccinationRecommendations.json')

module.exports = function recommendations(settings) {
  return vaccinationRecommendations.filter(
    item => settings[Object.keys(item)[0]] === true
  )
}
