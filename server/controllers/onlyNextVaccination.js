module.exports = function onlyNextVaccination(allDueVaccinations) {
  return allDueVaccinations
    .map(array => array[0])
    .filter(item => item != undefined)
    .sort((a, b) => a.begins - b.begins)
}
