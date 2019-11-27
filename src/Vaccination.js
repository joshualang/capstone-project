import styled from "styled-components/macro"
import React, { useState } from "react"
import TimeAgo from "react-timeago"
import germanStrings from "react-timeago/lib/language-strings/de"
import buildFormatter from "react-timeago/lib/formatters/buildFormatter"

import Title from "./common/Text/Title"

import DetailsText from "./common/Text/DetailsText"
import colors from "./colors"
import SectionText from "./common/Text/SectionText"
import back from "./ios-back.svg"

export default function Vaccination({
  vaccination,
  date,
  doctor,
  vaccinationOnClick,
  index,
  active
}) {
  const formatter = buildFormatter(germanStrings)
  console.log(active)

  return (
    <VaccinationStyled
      active={active}
      onClick={() => vaccinationOnClick(index)}
    >
      {active ? (
        <>
          <Nav>
            <img src={back} alt="back"></img>
            <Title textAlign="center">{vaccination}</Title>
          </Nav>
          <Line></Line>
          <Title>This is a Title</Title>
        </>
      ) : (
        <>
          <Title>{vaccination}</Title>
          <Details>
            <DetailsText fontWeight="Bold">
              <TimeAgo date={date} formatter={formatter} />
            </DetailsText>
            <DetailsText>{doctor}</DetailsText>
          </Details>
        </>
      )}
    </VaccinationStyled>
  )
}

const VaccinationStyled = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: ${props => (props.active ? "flex-start" : "space-between")};
  width: 100%;
  height: ${props => (props.active ? "100%" : "80px")};
  border-radius: 4px;
  background: ${colors.white};
  box-shadow: ${props =>
    props.active ? "none" : "0px 4px 8px rgb(48, 48, 48, 0.1)"};
  margin: ${props => (props.active ? "0 8px" : "8px 4px")};
  padding: ${props => (props.active ? "0 8px" : "24px 8px 16px")};
`
const Details = styled.div`
  display: flex;
  justify-content: space-between;
`
const Nav = styled.header`
  display: grid;
  grid-template-columns: 48px auto 48px;
  align-items: center;
`
const Line = styled.div`
  width: 100%;
  background: ${colors.greySemi};
  height: 1px;
  margin: 16px 0;
`
