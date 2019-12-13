const express = require('express')
const fs = require('fs')
const https = require('https')
const app = express()
const cors = require('cors')
const port = 3338

const admin = require('firebase-admin')
let serviceAccount = require('./medical-assistant-19fc3-cee7dfd4e3aa.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

let db = admin.firestore()

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000') // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, authorization'
  )
  next()
})
https
  .createServer(
    {
      key: fs.readFileSync('./server.key'),
      cert: fs.readFileSync('./server.cert'),
    },
    app
  )
  .listen(port, function() {
    console.log(
      'Example app listening on port 3338! Go to https://localhost:3008/'
    )
  })

app.get('/api/:user', function(req, res) {
  // idToken comes from the client app
  console.log(req)
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
              console.log(doc.data())
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
