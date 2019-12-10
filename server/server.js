const vaccinationRecommendations = require('./vaccinationRecommendations.json')
const admin = require('firebase-admin')
let serviceAccount = require('./medical-assistant-19fc3-cee7dfd4e3aa.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

let db = admin.firestore()

const express = require('express')
const uid = require('uid')
const cors = require('cors')

const server = express()
const port = 3334

server.listen(port, () => console.log(`Express ready on port ${port}`))
server.use(cors())
server.use(express.json())
server.set('json spaces', 2)

server.get('/api/:user', (req, res) => {
  const { user } = req.params

  db.collection('users')
    .doc(user)
    .get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!')
      } else {
        console.log(doc.data())
        db.collection('users')
          .doc(user)
          .set(nextVaccination(doc.data()))
      }
    })
    .then(
      db
        .collection('users')
        .doc(user)
        .get()
        .then(doc => {
          if (!doc.exists) {
            console.log('No such document!')
          } else {
            res.json(userFormatter(doc.data()))
          }
        })
        .catch(err => {
          console.log('Error getting document', err)
        })
    )
    .catch(err => {
      console.log('Error getting document', err)
    })
})

server.patch('/api/:user', (req, res) => {
  const { user } = req.params
  db.collection('vaccines')
    .doc(req.body.sticker)
    .get()
    .then(doc => {
      if (!doc.exists) {
        res.json(
          'Wir haben leider keine entsprechende Impfung gefunden. Vielleicht hast du dich vertippt?'
        )
      } else {
        const vaccine = doc.data()
        const newVaccinations = createVaccinationsMadeFromVaccine(vaccine, req)
        console.log('new vaccinations', newVaccinations)
        db.collection('users')
          .doc(user)
          .update({
            vaccinationsMade: admin.firestore.FieldValue.arrayUnion(
              ...newVaccinations
            ),
          })

        // .set(
        //   {
        //     vaccinationsMade: [...newVaccinations],
        //   },
        //   { merge: true }
        // )
        res.json(newVaccinations)
      }
    })
    .catch(err => {
      console.log('Error getting document', err)
    })
})

function createVaccinationsMadeFromVaccine(vaccine, request) {
  function toDateObject(reqDateString) {
    const day = Number(reqDateString.slice(0, 3))
    const month = Number(reqDateString.slice(3, 6))
    const year = Number(reqDateString.slice(6))
    return new Date(`${year}, ${month}, ${day}`)
  }

  let newVaccinations = []
  vaccine.diseases.forEach(disease => {
    function vaccinationType() {
      const indexOfDisease = vaccinationRecommendations.findIndex(
        item => item[disease]
      )

      if (indexOfDisease >= 0) {
        return vaccinationRecommendations[indexOfDisease][disease].find(
          entry =>
            entry.beginsAtAgeInDays <
            (toDateObject(request.body.date).getTime() -
              toDateObject(request.body.userBirth).getTime()) /
              (1000 * 60 * 60 * 24) <
            entry.endsAtAgeInDays
        ).vaccinationType
      } else {
        return 'Impfung nicht zuruordnen'
      }
    }

    newVaccinations.push({
      date: toDateObject(request.body.date),
      disease: disease,
      doctor: request.body.doctor,
      id: uid(),
      registrationNumber: request.body.sticker,
      admittedApplicant: vaccine.admittedApplicant,
      description: vaccine.description,
      furtherInformation: vaccine.furtherInformation,
      name: vaccine.name,
      registrationDate: vaccine.registrationDate,
      vaccinationType: vaccinationType(),
    })
  })
  console.log(newVaccinations)
  return newVaccinations
}

function userFormatter(json) {
  function toDate(key) {
    const months = {
      1: 'Jan',
      2: 'Feb',
      3: 'Mar',
      4: 'Apr',
      5: 'May',
      6: 'Jun',
      7: 'Jul',
      8: 'Aug',
      9: 'Sep',
      10: 'Oct',
      11: 'Nov',
      12: 'Dec',
    }

    key = new Date(key._seconds * 1000)
    const date = key.getDate()
    const month = key.getMonth() + 1
    const year = key.getFullYear()
    const dateString = `${months[month]} ${date}, ${year}`

    return dateString
  }

  function getVaccinationType(string) {
    const cases = {
      rotavirusG1: '1. Grundimmunisierung',
      rotavirusG2: '2. Grundimmunisierung',
      rotavirusG3: '3. Grundimmunisierung',
      rotavirusG4: '4. Grundimmunisierung',
      tetanusG1: '1. Grundimmunisierung',
      tetanusG2: '2. Grundimmunisierung',
      tetanusG3: '3. Grundimmunisierung',
      tetanusG4: '4. Grundimmunisierung',
      tetanusA1: '1. Auffrischimpfung',
      tetanusA2: '2. Auffrischimpfung',
      tetanusA: 'Auffrischimpfung',
      diphtherieG1: '1. Grundimmunisierung',
      diphtherieG2: '2. Grundimmunisierung',
      diphtherieG3: '3. Grundimmunisierung',
      diphtherieG4: '4. Grundimmunisierung',
      diphtherieA1: '1. Auffrischimpfung',
      diphtherieA2: '2. Auffrischimpfung',
      diphtherieA: 'Auffrischimpfung',
      pertussisG1: '1. Grundimmunisierung',
      pertussisG2: '2. Grundimmunisierung',
      pertussisG3: '3. Grundimmunisierung',
      pertussisG4: '4. Grundimmunisierung',
      pertussisA1: '1. Auffrischimpfung',
      pertussisA2: '2. Auffrischimpfung',
      pertussisA3: '3. Auffrischimpfung',
      hibG1: '1. Grundimmunisierung',
      hibG2: '2. Grundimmunisierung',
      hibG3: '3. Grundimmunisierung',
      hibG4: '4. Grundimmunisierung',
      poliomyeitisG1: '1. Grundimmunisierung',
      poliomyeitisG2: '2. Grundimmunisierung',
      poliomyeitisG3: '3. Grundimmunisierung',
      poliomyeitisG4: '4. Grundimmunisierung',
      poliomyeitisA1: '1. Auffrischimpfung',
      hepatitisBG1: '1. Grundimmunisierung',
      hepatitisBG2: '2. Grundimmunisierung',
      hepatitisBG3: '3. Grundimmunisierung',
      hepatitisBG4: '4. Grundimmunisierung',
      pneumokokkenG1: '1. Grundimmunisierung',
      pneumokokkenG2: '2. Grundimmunisierung',
      pneumokokkenG3: '3. Grundimmunisierung',
      pneumokokkenG4: '4. Grundimmunisierung',
      pneumokokkenS: 'Standardimpfung',
      meningokokkenG1: '1. Grundimmunisierung',
      masernG1: '1. Grundimmunisierung',
      masernG2: '2. Grundimmunisierung',
      masernS: 'Standardimpfung',
      mumpsG1: '1. Grundimmunisierung',
      mumpsG2: '2. Grundimmunisierung',
      variazellenG1: '1. Grundimmunisierung',
      variazellenG2: '2. Grundimmunisierung',
      hpvG1: '1. Grundimmunisierung',
      hpvG2: '2. Grundimmunisierung',
      herpesZosterG1: '1. Grundimmunisierung',
      herpesZosterG2: '2. Grundimmunisierung',
      influenza: 'Standardimpfung',
    }
    return cases[string]
  }

  json.age = toDate(json.age)

  json.vaccinationsOpen.map(item => {
    item.vaccinationType = getVaccinationType(item.vaccinationType)
    item.begins = toDate(item.begins)
  })

  json.vaccinationsMade.map(item => {
    item.vaccinationType = getVaccinationType(item.vaccinationType)
    item.date = toDate(item.date)
    item.registrationDate = toDate(item.registrationDate)
  })
  return json
}

function nextVaccination(data) {
  const birthDate = data.age._seconds * 1000
  const vaccinationsMade = data.vaccinationsMade

  function toAgeInDays(birth) {
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
        !vaccinationsMade.some(
          el => el.vaccinationType === item.vaccinationType
        ) &&
        userAgeInDays + 90 > item.beginsAtAgeInDays
      ) {
        vaccinationsDue[diseaseIndex] = [
          ...vaccinationsDue[diseaseIndex],
          {
            id: uid(),
            disease: diseaseName,
            begins: setDate(item.beginsAtAgeInDays - userAgeInDays),
            doctor: 'Vereinbare einen Termin',
            vaccinationType: item.vaccinationType,
          },
        ]
      }
    })
  })

  const vaccinationDue = vaccinationsDue
    .map(array => array[0])
    .filter(item => item != undefined)
    .sort((a, b) => a.begins - b.begins)

  console.log(vaccinationDue)
  data.vaccinationsOpen = vaccinationDue
  return data
}
