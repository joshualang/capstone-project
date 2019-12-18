module.exports = function toAgeInDays(birth) {
  const now = new Date().getTime()
  return Math.floor((now - birth) / (1000 * 60 * 60 * 24))
}
