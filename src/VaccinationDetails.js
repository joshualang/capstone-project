import React from "react"
import styled from "styled-components/macro"

import colors from "./common/styles/colors"
import Head from "./Head"
import Title from "./common/text/Title"
import Text from "./common/text/Text"
import Fadeout from "./common/Fadeout"
import Whitespace from "./common/Whitespace"

export default function VaccinationDetails() {
  return (
    <>
      <Head>title</Head>

      <VaccinationStyledOpen>
        <Title>Wann</Title>
        <Text>20. November 2019</Text>
        <Title>Arzt</Title>
        <Text>Dr. med. Max Mustermann</Text>
        <Title>Typ</Title>
        <Text>1. Grundimmunisierung</Text>
        <Title>Anmerkungen</Title>
        <Text>1. Grundimmunisierung</Text>
        <Title>Bezeichnung</Title>
        <Text>Ro­ta­rix</Text>
        <Title>Krankheit / Stoff-Indikationsgruppe</Title>
        <Text>
          Ro­ta­vi­rus-Impf­stoff (le­bend, at­te­nu­iert) Ver­wen­dung ab
          ei­nem Le­bensal­ter von 6 Wo­chen
        </Text>
        <Title>Zu­las­sungs­in­ha­ber</Title>
        <Text>Gla­xoS­mit­h­Kli­ne Bio­lo­gi­cals s.a., Bel­gi­en</Text>
        <Title>Impfstoffart</Title>
        <Text>Mono</Text>
        <Title>Zulassungsnummer</Title>
        <Text>EU/1/05/330/001-011</Text>
        <Title>Zu­las­sungs­da­tum</Title>
        <Text>21.02.2006</Text>
        <Title>Weitere Informationen</Title>
        <Text>
          EPAR: Ro­ta­rix In­for­ma­ti­on des Paul-Ehr­lich-In­sti­tuts zu
          Fäl­len von Dar­min­va­gi­na­ti­on nach Imp­fung ge­gen
          Ro­ta­vi­rus-Ga­stro­en­te­ri­tis (11.05.2015)
        </Text>
        <Whitespace />
      </VaccinationStyledOpen>
    </>
  )
}

const VaccinationStyledOpen = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background: ${colors.white};
  box-shadow: none;
  margin: 0 8px;
  padding: 16px 8px;
`
