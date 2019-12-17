module.exports = function toDateObject(reqDateString) {
  const day = Number(reqDateString.slice(0, 3))
  const month = Number(reqDateString.slice(3, 6))
  const year = Number(reqDateString.slice(6))
  return new Date(`${year}, ${month}, ${day}`)
}
