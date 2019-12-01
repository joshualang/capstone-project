import React from "react"
import styled from "styled-components/macro"
import Line from "./Line"
import back from "./img/ios-back.svg"
import SectionText from "./common/text/SectionText"
import Fadeout from "./common/Fadeout"
import { Link } from "react-router-dom"

export default function({ onBackClick, topRight, headline }) {
  return (
    <>
      <Header>
        <Grid>
          <Link to="/home">
            <img onClick={onBackClick} src={back} alt="back"></img>
          </Link>
          <SectionText textAlign="center">{headline}</SectionText>
          <div>{topRight}</div>
        </Grid>
        <Line margin="16px 0 0" />
        <Fadeout />
      </Header>
    </>
  )
}
const Grid = styled.div`
  display: grid;
  grid-template-columns: 14px auto 14px;
  align-items: center;
  justify-items: center;
  width: 100%;
`

const Header = styled.header`
  position: relative;
`
