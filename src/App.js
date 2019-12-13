import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import Home from './Home'
import SignInScreen from './Auth/AuthServices'

import firebase from 'firebase'
require('firebase/auth')
const auth = firebase.auth()

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null)
  auth.onAuthStateChanged(user => {
    if (user) {
      setLoggedInUser(user)
      firebase
        .auth()
        .currentUser.getIdToken(/* forceRefresh */ true)
        .then(function(idToken) {
          // Send token to your backend via HTTPS
          // ...
          console.log(idToken)
          fetch(`https://localhost:3338/${user.uid}`, {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              authorization: idToken,
            },
          }).then(res => res.json())
        })
    } else {
      setLoggedInUser(user)
    }
  })

  return loggedInUser ? (
    <Home user={loggedInUser}></Home>
  ) : (
    <SignInScreen></SignInScreen>
  )
}
