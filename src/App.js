import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'

import Home from './Home'
import LandingScreen from './LandingScreen'
const auth = firebase.auth()

export default function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user)
        console.log(user)
      } else {
        setUser(user)
      }
    })
  }, [])

  return user ? <Home user={user}></Home> : <LandingScreen></LandingScreen>
}
