import React from 'react'
import SignInScreen from './Auth/AuthServices'
import Headline from './common/text/Headline'

export default function LandingScreen() {
  return (
    <div>
      <Headline>Fancy Headline</Headline>
      <SignInScreen></SignInScreen>
    </div>
  )
}
