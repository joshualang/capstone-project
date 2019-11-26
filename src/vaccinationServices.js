import React from "react"
import Vaccination from "./Vaccination"

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

  let vaccinationsDue = []
  const userAgeInDays = toAgeInDays(birthDate)

  vaccinationRecommendations.forEach(disease => {
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
        vaccinationsDue = [
          ...vaccinationsDue,
          {
            vaccination: diseaseName,
            date: "You missed",
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
        vaccinationsDue = [
          ...vaccinationsDue,
          {
            vaccination: diseaseName,
            date: "You missed",
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

  const allVaccinations = [...vaccinationsMade, ...vaccinationsDue]
  const vaccinationsOrdered = [
    {
      due: allVaccinations.filter(item => !item.hasOwnProperty("_id"))
    },
    {
      done: allVaccinations.filter(item => item.hasOwnProperty("_id"))
    }
  ]
  console.log(allVaccinations)
  console.log(vaccinationsOrdered)
  return vaccinationsOrdered
}
