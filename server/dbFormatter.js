module.exports = function dbFormatter(dbData) {
  let data = dbData
  data.age = dbData.age._seconds * 1000
  return data
}
