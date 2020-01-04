const updateVaccinations = require('./controllers/updateVaccinationsOpen')
const userFormatter = require('./controllers/Formatter/userFormatter')
const createVaccinationsMadeFromVaccine = require('./controllers/createVaccinationsMadeFromVaccine')
const toDateObject = require('./controllers/Time/toDateObject')

const express = require('express')
const fs = require('fs')
const https = require('https')
const app = express()
const cors = require('cors')
const port = 3338

const admin = require('firebase-admin')
let serviceAccount = require('./.env/medical-assistant-19fc3-cee7dfd4e3aa.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

let db = admin.firestore()

app.use(cors())
app.use(express.json())
app.set('json spaces', 2)

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, authorization'
  )
  next()
})

https
  .createServer(
    {
      key: fs.readFileSync('./.env/server.key'),
      cert: fs.readFileSync('./.env/server.cert'),
    },
    app
  )
  .listen(port, function() {
    console.log(
      'Example app listening on port 3338! Go to https://localhost:3008/'
    )
  })

app.get('/api/:user', function(req, res) {
  const { user } = req.params
  const idToken = req.headers.authorization
  console.log('request', req)
  admin
    .auth()
    .verifyIdToken(idToken)
    .then(function(decodedToken) {
      let uid = decodedToken.uid
      if (uid === user) {
        db.collection('users')
          .doc(user)
          .get()
          .then(doc => {
            if (!doc.exists) {
              console.log('No such document!')
            } else {
              const newData = updateVaccinations(doc.data())
              db.collection('users')
                .doc(user)
                .set(newData)

              res.json(userFormatter(newData))
            }
          })
          .catch(err => {
            console.log('Error getting document', err)
          })
      } else {
        console.log('not auth')
      }
    })
    .catch(function(error) {
      console.log(error)
    })
})

app.patch('/api/settings/:user', (req, res) => {
  const { user } = req.params
  const idToken = req.headers.authorization
  admin
    .auth()
    .verifyIdToken(idToken)
    .then(function(decodedToken) {
      let uid = decodedToken.uid
      console.log('uid', uid)
      if (uid === user) {
        db.collection('users')
          .doc(user)
          .get()
          .then(doc => {
            if (!doc.exists) {
              console.log('No such document!')
            } else {
              console.log('settings', req.body)
              db.collection('users')
                .doc(user)
                .set(
                  {
                    age: toDateObject(req.body.age),
                    settings: req.body.settings,
                  },
                  { merge: true }
                )
            }
          })
      }
    })
})

app.patch('/api/:user', (req, res) => {
  const { user } = req.params
  const idToken = req.headers.authorization
  admin
    .auth()
    .verifyIdToken(idToken)
    .then(function(decodedToken) {
      let uid = decodedToken.uid
      if (uid === user) {
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
              const newVaccinations = createVaccinationsMadeFromVaccine(
                vaccine,
                req
              )
              db.collection('users')
                .doc(user)
                .update({
                  vaccinationsMade: admin.firestore.FieldValue.arrayUnion(
                    ...newVaccinations
                  ),
                })
              res.json(newVaccinations)
            }
          })
      } else {
        console.log('not auth')
      }
    })
    .catch(function(error) {
      console.log(error)
    })
})
