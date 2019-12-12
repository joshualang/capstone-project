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
