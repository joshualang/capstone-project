import firebase from 'firebase/app'
import 'firebase/auth'
import { createUser } from '../../../helper/services'
const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG)
firebase.initializeApp(firebaseConfig)
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
