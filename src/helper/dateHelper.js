export function isValidDate(date) {
  const matches = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(date)
  if (matches == null) return false
  const d = Number(matches[1])
  const m = Number(matches[2]) - 1
  const y = Number(matches[3])
  const composedDate = new Date(y, m, d)
  return (
    composedDate.getDate() === d &&
    composedDate.getMonth() === m &&
    composedDate.getFullYear() === y
  )
}

export function nowAsString() {
  function addLeadingZero(n) {
    return n < 10 ? '0' + n : n
  }
  const now = new Date()
  const date = now.getDate()
  const month = now.getMonth() + 1
  const year = now.getFullYear()
  return `${addLeadingZero(date)}.${addLeadingZero(month)}.${year}`
}

export function stringifyDate(dateObject) {
  function addLeadingZero(n) {
    return n < 10 ? '0' + n : n
  }
  const date = dateObject.getDate()
  const month = dateObject.getMonth() + 1
  const year = dateObject.getFullYear()
  return `${addLeadingZero(date)}.${addLeadingZero(month)}.${year}`
}
