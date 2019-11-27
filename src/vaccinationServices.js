export default function nextDate(
  birthDate,
  vaccinationsMade,
  vaccinationRecommendations
) {
  function toAgeInDays(date) {
    const birth = new Date(date).getTime()
    const now = new Date().getTime()
    return Math.floor((now - birth) / (1000 * 60 * 60 * 24))
  }
  function setDate(days) {
    const nowInMilliseconds = new Date().getTime()
    const futureInMilliseconds = days * (1000 * 60 * 60 * 24)
    const timestamp = nowInMilliseconds + futureInMilliseconds
    return new Date(timestamp)
  }

  let vaccinationsDue = []
  const userAgeInDays = toAgeInDays(birthDate)

  vaccinationRecommendations.forEach((disease, diseaseIndex) => {
    vaccinationsDue = [...vaccinationsDue, []]
    const diseaseName = Object.keys(disease)[0]
    const singleDiseaseName = disease[diseaseName]

    singleDiseaseName.forEach(item => {
      if (
        vaccinationsMade.find(
          el => el.disease === diseaseName && el.type === item.type
        )
      ) {
        return
      } else if (userAgeInDays + 900 > item.ageInDays) {
        vaccinationsDue[diseaseIndex] = [
          ...vaccinationsDue[diseaseIndex],
          {
            vaccination: diseaseName,
            date: setDate(item.ageInDays - userAgeInDays),
            doctor: "Select a Doctor",
            type: item.type
          }
        ]
      }
    })
  })

  vaccinationsDue = vaccinationsDue
    .map(array => array[0])
    .filter(item => item != undefined)
    .sort((a, b) => a.date - b.date)

  const allVaccinations = [...vaccinationsMade, ...vaccinationsDue]
  const vaccinationsOrdered = [
    {
      due: allVaccinations.filter(el => !el.hasOwnProperty("_id"))
    },
    {
      done: allVaccinations.filter(item => item.hasOwnProperty("_id"))
    }
  ]
  return vaccinationsOrdered
}
