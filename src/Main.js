import React, { Children } from "react"
import styled from "styled-components/macro"
import VaccinationCard from "./VaccinationCard"
import SectionText from "./common/text/SectionText"
import colors from "./common/styles/colors"
import Vaccinations from "./Vaccinations"

export default function Main({
  data = [],
  vaccinationOnClick,
  children,
  fullscreen = false
}) {
  return (
    <MainStyled fullscreen={fullscreen}>
      {children}
      <Vaccinations data={data} vaccinationOnClick={vaccinationOnClick} />
    </MainStyled>
  )
}

const MainStyled = styled.main`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${props => (props.fullscreen ? "90vh" : "80vh")};
  background: ${colors.white};
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding: 24px 24px 0;
  overflow: hidden;
`
