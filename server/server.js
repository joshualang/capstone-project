const vaccinationRecommendations = require("./vaccinationRecommendations.json")
const admin = require("firebase-admin")
let serviceAccount = require("./medical-assistant-19fc3-cee7dfd4e3aa.json")
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})
let db = admin.firestore()

const express = require("express")
const uid = require("uid")
const cors = require("cors")

const server = express()
const port = 3334
server.listen(port, () => console.log(`Express ready on port ${port}`))
server.use(cors())
server.use(express.json())
server.set("json spaces", 2)

server.get("/api/:user", (req, res) => {
  const { user } = req.params

  db.collection("users")
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
  updateVaccinationsOpen(user)
  db.collection("users")
    .doc(user)
    .get()
    .then(doc => {
      if (!doc.exists) {
        res.send("No such document!")
      } else {
        res.send(userFormatter(doc.data()))
      }
    })
    .catch(err => {
      res.send("Error getting document", err)
    })
})

server.patch("/api/:user", (req, res) => {
  let newVaccinations = []
  console.log(req.body)
  db.collection("vaccines")
    .doc("421FbrvSm2Vc4EJsTejV")
    .get()
    .then(doc => {
      if (!doc.exists) {
        console.log("No such document!")
      } else {
        const vaccine = doc.data()
        vaccine.diseases.forEach(disease => {
          newVaccinations.push({
            date: req.body.date,
            disease: disease,
            doctor: req.body.doctor,
            id: uid(),
            registrationNumber: req.body.sticker,
            vaccinationType: "To be found",
            admittedApplicant: vaccine.admittedApplicant,
            description: vaccine.description,
            furtherInformation: vaccine.furtherInformation,
            name: vaccine.name,
            registrationDate: vaccine.registrationDate
          })
        })
        db.collection("users")
          .doc("LA")
          .set({ vaccinationsMade: [...newVaccinations] }, { merge: true })
      }
    })
    .catch(err => {
      console.log("Error getting document", err)
    })

  res.json("Arrived")
  //make request for vaccine in firestore
  //create entrie
  //set to firestore with merge: true
  //send set to firestore back
})

function userFormatter(json) {
  function toDate(key) {
    const months = {
      1: "Jan",
      2: "Feb",
      3: "Mar",
      4: "Apr",
      5: "May",
      6: "Jun",
      7: "Jul",
      8: "Aug",
      9: "Sep",
      10: "Oct",
      11: "Nov",
      12: "Dec"
    }

    key = new Date(key._seconds * 1000)
    const date = key.getDate()
    const month = key.getMonth() + 1
    const year = key.getFullYear()
    const dateString = `${months[month]} ${date}, ${year}`

    return dateString
  }

  function getType(string) {
    const cases = {
      rotavirusG1: "1. Grundimmunisierung",
      rotavirusG2: "2. Grundimmunisierung",
      rotavirusG3: "3. Grundimmunisierung",
      rotavirusG4: "4. Grundimmunisierung"
    }
    return cases[string]
  }

  json.age = toDate(json.age)

  json.vaccinationsOpen.map(item => {
    item.vaccinationType = getType(item.vaccinationType)
    item.begins = toDate(item.begins)
    item.intervall = `${item.intervall} Tage`
  })

  json.vaccinationsMade.map(item => {
    item.vaccinationType = getType(item.vaccinationType)
    item.date = toDate(item.date)
    item.intervall = `${item.intervall} Tage`
  })
  return json
}

function updateVaccinationsOpen(user) {
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
  const diseaseNames = {
    rotaviren: "Rotavirus",
    tetanus: "Tetanus",
    diphterie: "Diphterie",
    pertussis: "Pertussis",
    hib: "Hib",
    poliomyeitis: "Polio",
    hepatitisB: "Hepatitis B",
    pneumokokken: "Pneumokokken",
    meningokokkenC: "Meningokokken C",
    masern: "Masern",
    mumps: "Mumps, Röteln",
    varizellen: "Varizellen",
    hpv: "HPV",
    herpesZoster: "Herpes Zoster",
    influenza: "Influenza"
  }

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
            id: uid(),
            disease: diseaseNames[diseaseName],
            begins: setDate(item.ageInDays - userAgeInDays),
            doctor: "Select a Doctor",
            vaccinationType: item.vaccinationType,
            intervall: item.intervall || 0
          }
        ]
      }
    })
  })
  console.log(vaccinationsDue)

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
