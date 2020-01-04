import React from 'react'
import styled from 'styled-components/macro'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase'
import config from './firebaseConfig'
import colors from '../common/styles/colors'
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

export default function SignInScreen() {
  return (
    <SignInCard>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </SignInCard>
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

export const signOut = () => auth.signOut()

const SignInCard = styled.div`
  background: ${colors.white};
  box-shadow: 0px 4px 8px rgb(48, 48, 48, 0.1);
  margin: 24px 0;
  border-radius: 4px;
  padding: 24px 0;
  position: fixed;
  top: 20vh;
  left: 24px;
  right: 24px;
`
