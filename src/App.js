import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'

import Home from './components/Home/Home'
import LandingScreen from './components/LandingScreen/LandingScreen'
const auth = firebase.auth()

export default function App() {
  const [user, setUser] = useState(null)
  console.log(user)

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user)
      } else {
        setUser(user)
      }
    })
  }, [])

  return false ? <Home user={user}></Home> : <LandingScreen></LandingScreen>
}
