import firebase from 'firebase'
import config from './firebaseConfig'
import { createUser } from '../services'
require('firebase/auth')

firebase.initializeApp(config)
const auth = firebase.auth()

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
      createUser(user.user.uid, user.user._lat, name, birth)
    })
    //.then((window.location.href = '/'))
    .catch(function(error) {
      // Handle Errors here.
    })
}

export function signInWithEmail(email, password) {
  auth.signInWithEmailAndPassword(email, password)
}

export const signOut = () => auth.signOut()
