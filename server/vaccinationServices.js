const vaccinationRecommendations = require("./vaccinationRecommendations.json")

//let db = require("./firebase")
const admin = require("firebase-admin")
let serviceAccount = require("./medical-assistant-19fc3-cee7dfd4e3aa.json")
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})
let db = admin.firestore()

exports.updateVaccinationsOpen = function(user) {
  db.collection("user")
    .doc(user)
    .get()
    .then(doc => {
      if (!doc.exists) {
        console.log("No such document!")
      } else {
        db.collection("users")
          .doc("LA")
          .set(nextVaccination(doc.data(), { merge: true }))
      }
    })
    .catch(err => {
      console.log("Error getting document", err)
    })
}

function nextVaccination(data) {
  const birthDate = data.age._seconds * 1000
  const vaccinationsMade = data.vaccinationsMade
  const vaccinationsOpen = data.vaccinationsOpen

  function toAgeInDays(birth) {
    const now = new Date().getTime()
    console.log(now)
    return Math.floor((now - birth) / (1000 * 60 * 60 * 24))
  }
  function setDate(days) {
    const nowInMilliseconds = new Date().getTime()
    const futureInMilliseconds = days * (1000 * 60 * 60 * 24)
    const timestamp = nowInMilliseconds + futureInMilliseconds
    return new Date(timestamp)
  }

  let vaccinationsDue = []
  console.log("birthDate", birthDate)
  const userAgeInDays = toAgeInDays(birthDate)
  console.log("userAgeInDays", userAgeInDays)
  vaccinationRecommendations.forEach((disease, diseaseIndex) => {
    vaccinationsDue = [...vaccinationsDue, []]
    const diseaseName = Object.keys(disease)[0]
    const singleDisease = disease[diseaseName]

    singleDisease.forEach(item => {
      if (
        !vaccinationsMade.some(
          el => el.vaccinationType === item.vaccinationType
        ) &&
        userAgeInDays + 90 > item.ageInDays
      ) {
        vaccinationsDue[diseaseIndex] = [
          ...vaccinationsDue[diseaseIndex],
          {
            vaccination: diseaseName,
            begins: setDate(item.ageInDays - userAgeInDays),
            doctor: "Select a Doctor",
            vaccinationType: item.vaccinationType,
            intervall: item.intervall || 0
          }
        ]
      }
    })
  })

  const vaccinationDue = vaccinationsDue
    .map(array => array[0])
    .filter(item => item != undefined)
    .sort((a, b) => a.date - b.date)

  vaccinationDue.forEach(due => {
    if (
      !vaccinationsOpen.some(
        open => open.vaccinationType === due.vaccinationType
      )
    ) {
      vaccinationsOpen.push(due)
    }
  })
  return data
}

//updateVaccinationsOpen("ZA1U8UchFPV5nk7ZuICs")
