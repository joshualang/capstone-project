import React from 'react'
import styled from 'styled-components/macro'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase'
import config from './firebaseConfig'
import AuthCard from './AuthCard'
import { createNewUser } from '../services'
require('firebase/auth')

firebase.initializeApp(config)
const auth = firebase.auth()

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
}

export function SignInScreen() {
  return (
    <AuthCard>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </AuthCard>
  )
}

export function updateUserDisplayName(newName) {
  var user = auth.currentUser

  user
    .updateProfile({
      displayName: newName,
    })
    .then(function() {
      // Update successful.
    })
    .catch(function(error) {
      // An error happened.
    })
}

export function signUpWithEmail(email, password, name, birth) {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      console.log('createuser', user.user.uid, user.uid)
      createNewUser(user.user.uid, user.user._lat, name, birth)
    })
    //.then((window.location.href = '/'))
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code
      var errorMessage = error.message
      // ...
    })
}

export function signInWithEmail(email, password) {
  auth.signInWithEmailAndPassword(email, password)
}

export const signOut = () => auth.signOut()
