import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import RegisterWithEmail from './Auth/RegisterWithEmail'
import Headline from '../common/text/Headline'
import AuthCard from './Auth/AuthCard'
import Text from '../common/text/Text'

import loginBg from '../../img/loginBg.svg'
import colors from '../common/styles/colors'
import LoginWithEmail from './Auth/LoginWithEmail'

export default function LandingScreen() {
  return (
    <Background imgPath={loginBg}>
      <Headline color={colors.blue} textAlign="right">
        Gib deiner Gesundheit ein Zuhause
      </Headline>
      <AuthCard>
        <Switch>
          <Route path="/login">
            <LoginWithEmail></LoginWithEmail>
          </Route>
          <Route path="/register">
            <RegisterWithEmail></RegisterWithEmail>
          </Route>
          <Route path="/">
            <Options>
              <Link to="login">
                <LoginButton>
                  <Text color="white" style={{ paddingBottom: 0 }}>
                    Mit E-Mail einloggen
                  </Text>
                </LoginButton>
              </Link>
              <Link to="register">
                <Text color={colors.blue} style={{ paddingBottom: 0 }}>
                  Registrieren
                </Text>
              </Link>
            </Options>
          </Route>
        </Switch>
      </AuthCard>
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
const Options = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const LoginButton = styled.button`
  width: 240px;
  border: none;
  background: black;
  color: white;
  text-decoration: none;
  padding: 8px;
  margin: 16px;
`
