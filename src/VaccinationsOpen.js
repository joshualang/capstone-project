import React from 'react'
import VaccinationCard from './VaccinationCard'
import styled from 'styled-components/macro'
import SectionText from './common/text/SectionText'

export default function({ data }) {
  return (
    <Vaccinations>
      <SectionText>Anstehende Impfungen</SectionText>
      {data.length > 0
        ? data.map(entry => (
            <VaccinationCard
              key={entry.id}
              vaccination={entry.disease}
              date={entry.begins}
              doctor={entry.doctor}
              id={entry.id}
            ></VaccinationCard>
          ))
        : 'du bist geschützt'}
    </Vaccinations>
  )
}
const Vaccinations = styled.div`
  height: 100%;
  overflow-y: scroll;
`
