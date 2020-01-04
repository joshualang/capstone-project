module.exports = function toDateString(dateObject) {
  const dateObjectCopy = dateObject
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

  if (Object.keys(dateObjectCopy).length > 1) {
    dateObjectFormatted = new Date(dateObjectCopy._seconds * 1000)
  } else {
    dateObjectFormatted = new Date(dateObjectCopy)
  }

  const date = dateObjectFormatted.getDate()
  const month = dateObjectFormatted.getMonth() + 1
  const year = dateObjectFormatted.getFullYear()
  const dateString = `${months[month]} ${date}, ${year}`

  return dateString
}
