module.exports = function toDateString(dateObject) {
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

  if (Object.keys(dateObject).length > 1) {
    dateObject = new Date(dateObject._seconds * 1000)
  } else {
    dateObject = new Date(dateObject)
  }

  const date = dateObject.getDate()
  const month = dateObject.getMonth() + 1
  const year = dateObject.getFullYear()
  const dateString = `${months[month]} ${date}, ${year}`

  return dateString
}
