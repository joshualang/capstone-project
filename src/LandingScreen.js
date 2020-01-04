import React from 'react'
import styled from 'styled-components/macro'
import SignInScreen from './Auth/AuthServices'
import Headline from './common/text/Headline'

import loginBg from './img/loginBg.svg'
import colors from './common/styles/colors'

export default function LandingScreen() {
  return (
    <Background imgPath={loginBg}>
      <Headline color={colors.blue} textAlign="right">
        Gib deiner Gesundheit ein Zuhause
      </Headline>
      <SignInScreen></SignInScreen>
    </Background>
  )
}

const Background = styled.div`
  background-image: url(${props => props.imgPath});
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-content: center;
  padding: 24px;
`
