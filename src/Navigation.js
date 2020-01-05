import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { useSpring, animated } from 'react-spring'
import { signOut } from './Auth/AuthServices'

import colors from './common/styles/colors'

import Title from './common/text/Title'
import Line from './Line'

import ProfileChooser from './ProfileChooser'

export default function({ profiles, onMenuClick, refresh }) {
  const props = useSpring({
    config: { tension: 5000, mass: 1, friction: 300 },
    opacity: 1,
    transform: 'translateX(0)',
    from: { opacity: 0, transform: 'translateX(-100%)' },
  })

  return (
    <>
      <Navigation style={props}>
        <div>
          <ProfileChooser
            refresh={refresh}
            profiles={profiles}
          ></ProfileChooser>
          <Line margin="8px 0 16px"></Line>
          <FlexboxGap>
            <Link to="/vaccinationsMade" onClick={() => onMenuClick()}>
              <Title>Impfpass</Title>
            </Link>
            <Link to="/vaccinationsOpen" onClick={() => onMenuClick()}>
              <Title>Offene Impfungen</Title>
            </Link>
          </FlexboxGap>
        </div>
        <div>
          <Title color="crimson" onClick={() => signOut()}>
            Abmelden
          </Title>
          <Line></Line>
          <Link to="/settings" onClick={() => onMenuClick()}>
            <Title>Einstellungen</Title>
          </Link>
        </div>
      </Navigation>
      <ClosingArea onClick={() => onMenuClick()}></ClosingArea>
    </>
  )
}
const Navigation = styled(animated.nav)`
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  width: 70%;
  padding: 32px 24px 16px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: ${colors.white};
  box-shadow: 8px 0px 16px rgb(48, 48, 48, 0.2);
`
const ClosingArea = styled.div`
  position: absolute;
  z-index: 100;
  top: 0;
  right: 0;
  bottom: 0;
  width: 30%;
`
const FlexboxGap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
