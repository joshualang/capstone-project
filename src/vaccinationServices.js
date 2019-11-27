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
    const singleDisease = disease[diseaseName]
    singleDisease.forEach(item => {
      if (
        vaccinationsMade.find(
          el => el.disease === diseaseName && el.type === item.type
        )
      ) {
        console.log(
          "vaccination made",
          diseaseName,
          item.type,
          vaccinationsMade,
          item
        )
        //Vaccination made
        return console.log("vaccination made")
      } else if (userAgeInDays > item.ageInDays) {
        //You missed ... || implement intervall
        console.log(
          "You missed",
          diseaseName,
          item.type,
          vaccinationsMade,
          item
        )
        vaccinationsDue[diseaseIndex] = [
          ...vaccinationsDue[diseaseIndex],
          {
            vaccination: diseaseName,
            date: setDate(item.ageInDays - userAgeInDays),
            doctor: "Select a Doctor",
            type: item.type
          }
        ]
      } else if (userAgeInDays + 90 > item.ageInDays) {
        //vaccinationsDue.push(entry)
        console.log(
          "Make an Appointment",
          diseaseName,
          item.type,
          vaccinationsMade,
          item
        )
        vaccinationsDue[diseaseIndex] = [
          ...vaccinationsDue[diseaseIndex],
          {
            vaccination: diseaseName,
            date: setDate(item.ageInDays - userAgeInDays),
            doctor: "Select a Doctor",
            type: item.type
          }
        ]
      } else {
        console.log(
          "3+ Months in the future",
          diseaseName,
          item.type,
          vaccinationsMade,
          item
        )
      }
    })
  })

  vaccinationsDue = vaccinationsDue
    .map(array => array[0])
    .filter(item => item != undefined)

  const allVaccinations = [...vaccinationsMade, ...vaccinationsDue]
  const vaccinationsOrdered = [
    {
      due: allVaccinations.filter(el => !el.hasOwnProperty("_id"))
    },
    {
      done: allVaccinations.filter(item => item.hasOwnProperty("_id"))
    }
  ]
  console.log("return", vaccinationsOrdered)
  return vaccinationsOrdered
}
