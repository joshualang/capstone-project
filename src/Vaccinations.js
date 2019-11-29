import React from "react"
import VaccinationCard from "./VaccinationCard"
import styled from "styled-components/macro"
import Fadeout from "./common/Fadeout"

export default function({ data, vaccinationOnClick }) {
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

  return (
    <Vaccinations>
      {data
        .filter(item => (false ? item.isOpen : true))
        .map((el, index) => (
          <>
            <VaccinationCard
              key={index + el.vaccination + el.date}
              vaccination={diseaseNames[el.vaccination]}
              date={el.date}
              doctor={el.doctor}
              vaccinationOnClick={vaccinationOnClick}
              index={index}
              active={el.isOpen}
            ></VaccinationCard>
          </>
        ))}
    </Vaccinations>
  )
}
const Vaccinations = styled.div`
  height: 100%;
  overflow-y: scroll;
`
