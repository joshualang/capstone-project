const getVaccinationType = require('./getVaccinationType')

module.exports = function userFormatter(json) {
  function toDate(key) {
    const months = {
      1: 'Jan',
      2: 'Feb',
      3: 'Mar',
      4: 'Apr',
      5: 'May',
      6: 'Jun',
      7: 'Jul',
      8: 'Aug',
      9: 'Sep',
      10: 'Oct',
      11: 'Nov',
      12: 'Dec',
    }

    key = new Date(key._seconds * 1000)
    const date = key.getDate()
    const month = key.getMonth() + 1
    const year = key.getFullYear()
    const dateString = `${months[month]} ${date}, ${year}`

    return dateString
  }

  //const getVaccinationType = require('./getVaccinationType')

  json.age = toDate(json.age)

  json.vaccinationsOpen.map(item => {
    item.vaccinationType = getVaccinationType(item.vaccinationType)
    item.begins = toDate(item.begins)
  })

  json.vaccinationsMade.map(item => {
    item.vaccinationType = getVaccinationType(item.vaccinationType)
    item.date = toDate(item.date)
    item.registrationDate = toDate(item.registrationDate)
  })
  return json
}
