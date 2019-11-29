import React, { Children } from "react"
import styled from "styled-components/macro"
import Vaccination from "./Vaccination"
import SectionText from "./common/text/SectionText"
import colors from "./common/styles/colors"

export default function Main({ data, vaccinationOnClick, children }) {
  const sectionTitles = {
    due: "Anstehende Impfungen",
    done: "Erledigte Impfungen"
  }
  const diseaseNames = {
    rotaviren: "Rotaviren",
    tetanus: "Tetanus",
    diphterie: "Diphterie",
    pertussis: "Pertussis",
    hib: "Humane Papillomviren",
    poliomyeitis: "Poliomyeitis",
    hepatitisB: "Hepatitis B",
    pneumokokken: "Pneumokokken",
    meningokokkenC: "Meningokokken C",
    masern: "Masern",
    mumps: "mumps",
    varizellen: "Varizellen",
    hpv: "HPV",
    herpesZoster: "Herpes zoster",
    influenza: "Influenza"
  }
  const oneOpen = data.some(item => item.isOpen === true)
  return (
    <MainStyled active={oneOpen}>
      {children}
      {data
        .filter(item => (oneOpen ? item.isOpen : true))
        .map((el, index) => (
          <>
            <Vaccination
              key={index + el.vaccination + el.date}
              vaccination={diseaseNames[el.vaccination]}
              date={el.date}
              doctor={el.doctor}
              vaccinationOnClick={vaccinationOnClick}
              index={index}
              active={el.isOpen}
            ></Vaccination>
          </>
        ))}
    </MainStyled>
  )
}

const MainStyled = styled.main`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${props => (props.active ? "90vh" : "80vh")};
  background: ${colors.white};
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding: 24px;
  overflow-y: scroll;
`
