import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components/macro"
import { useSpring, animated, config } from "react-spring"

import colors from "./common/styles/colors"

import SectionText from "./common/text/SectionText"
import Title from "./common/text/Title"
import Line from "./Line"

export default function({ profile, onMenuClick }) {
  const props = useSpring({
    config: { tension: 5000, mass: 1, friction: 300 },
    opacity: 1,
    transform: "translateX(0)",
    from: { opacity: 0, transform: "translateX(-100%)" }
  })
  return (
    <>
      <Navigation style={props}>
        <div>
          <SectionText>{profile}</SectionText>
          <Line margin="8px 0 16px"></Line>
          <Link to="/home" onClick={() => onMenuClick()}>
            <Title>Home</Title>
          </Link>
        </div>
        <div>
          <Line></Line>
          <Title>Einstellungen</Title>
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
