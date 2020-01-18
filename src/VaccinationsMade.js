import React from 'react'
import VaccinationCard from './VaccinationCard'
import styled from 'styled-components/macro'
import SectionText from './common/text/SectionText'
import Text from './common/text/Text'

import nomadevaccinations from './img/nomadevaccinations.svg'

export default function({ data }) {
  return (
    <Vaccinations>
      <SectionText>Erledigte Impfungen</SectionText>
      {data.length > 0 ? (
        data.map(entry => (
          <VaccinationCard
            key={entry.id}
            vaccination={entry.disease}
            date={entry.date}
            doctor={entry.doctor}
            id={entry.id}
          ></VaccinationCard>
        ))
      ) : (
        <BackgroundImg>
          <img src={nomadevaccinations}></img>
          <Text>
            Du hast noch keine <br></br>Impfungen hinzugefügt
          </Text>
        </BackgroundImg>
      )}
    </Vaccinations>
  )
}
const Vaccinations = styled.div`
  height: 100%;
  overflow-y: scroll;
`

const BackgroundImg = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  gap: 8px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`
