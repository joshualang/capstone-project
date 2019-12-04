import React from "react"
import VaccinationCard from "./VaccinationCard"
import styled from "styled-components/macro"
import SectionText from "./common/text/SectionText"

export default function({ data }) {
  return (
    <Vaccinations>
      <SectionText>Anstehende Impfungen</SectionText>
      {data.vaccinationsOpen.map(entry => (
        <>
          <VaccinationCard
            key={entry.id}
            vaccination={entry.disease}
            date={entry.begins}
            doctor={entry.doctor}
            id={entry.id}
          ></VaccinationCard>
        </>
      ))}
      <SectionText style={{ paddingTop: "16px" }}>
        Erledigte Impfungen
      </SectionText>
      {data.vaccinationsMade.map(entry => (
        <>
          <VaccinationCard
            key={entry.id}
            vaccination={entry.disease}
            date={entry.date}
            doctor={entry.doctor}
            id={entry.id}
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
