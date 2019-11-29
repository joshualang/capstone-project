import React from "react"
import styled from "styled-components/macro"
import colors from "./common/styles/colors"

import SectionText from "./common/text/SectionText"
import Title from "./common/text/Title"
import Line from "./Line"

export default function({ onMenuClick }) {
  return (
    <>
      <Navigation>
        <div>
          <SectionText>User</SectionText>
          <Line margin="8px 0 16px"></Line>
          <Title>Home</Title>
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
const Navigation = styled.nav`
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
  box-shadow: 0px 4px 8px rgb(48, 48, 48, 0.1);
`
const ClosingArea = styled.div`
  position: absolute;
  z-index: 100;
  top: 0;
  right: 0;
  bottom: 0;
  width: 30%;
`
