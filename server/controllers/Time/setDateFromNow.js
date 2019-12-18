module.exports = function setDateFromNow(days) {
  const nowInMilliseconds = new Date().getTime()
  const futureInMilliseconds = days * (1000 * 60 * 60 * 24)
  const timestamp = nowInMilliseconds + futureInMilliseconds
  return new Date(timestamp)
}
