import React from 'react'
import VaccinationCard from './VaccinationCard'
import styled from 'styled-components/macro'
import SectionText from './common/text/SectionText'

export default function({ data }) {
  return (
    <Vaccinations>
      <SectionText>Erledigte Impfungen</SectionText>
      {data.length > 0
        ? data.map(entry => (
            <VaccinationCard
              key={entry.id}
              vaccination={entry.disease}
              date={entry.date}
              doctor={entry.doctor}
              id={entry.id}
            ></VaccinationCard>
          ))
        : 'du hast keine impfungen'}
    </Vaccinations>
  )
}
const Vaccinations = styled.div`
  height: 100%;
  overflow-y: scroll;
`
