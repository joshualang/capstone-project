import React from "react"
import styled from "styled-components/macro"
import Line from "./Line"
import back from "./img/ios-back.svg"
import SectionText from "./common/text/SectionText"

export default function({ children, onBackClick, topRight }) {
  return (
    <>
      <Nav>
        <img onClick={onBackClick} src={back} alt="back"></img>
        <SectionText textAlign="center">Headline</SectionText>
        {topRight}
      </Nav>
      <Line></Line>
    </>
  )
}

const Nav = styled.header`
  display: grid;
  grid-template-columns: 14px auto 14px;
  align-items: center;
  justify-items: center;
`
