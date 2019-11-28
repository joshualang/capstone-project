import styled from "styled-components/macro"
import React from "react"
import TimeAgo from "react-timeago"
import germanStrings from "react-timeago/lib/language-strings/de"
import buildFormatter from "react-timeago/lib/formatters/buildFormatter"

import colors from "./colors"
import Title from "./common/Text/Title"
import DetailsText from "./common/Text/DetailsText"
import Text from "./common/Text/Text"
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

  return active ? (
    <>
      <VaccinationStyledOpen
        active={active}
        onClick={() => vaccinationOnClick(index)}
      >
        <Nav>
          <img src={back} alt="back"></img>
          <SectionText textAlign="center">{vaccination}</SectionText>
        </Nav>
        <Line></Line>
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
      </VaccinationStyledOpen>
    </>
  ) : (
    <>
      <VaccinationStyled
        active={active}
        onClick={() => vaccinationOnClick(index)}
      >
        <Title>{vaccination}</Title>
        <Details>
          <DetailsText fontWeight="Bold">
            <TimeAgo date={date} formatter={formatter} />
          </DetailsText>
          <DetailsText>{doctor}</DetailsText>
        </Details>
      </VaccinationStyled>
    </>
  )
}

const VaccinationStyled = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  border-radius: 4px;
  background: ${colors.white};
  box-shadow: 0px 4px 8px rgb(48, 48, 48, 0.1);
  margin: 8px 4px;
  padding: 24px 8px 16px;
`
const VaccinationStyledOpen = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background: ${colors.white};
  box-shadow: none;
  margin: 0 8px;
  padding: 0 8px;
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
  padding: 1px 0 0;
  margin: 16px 0;
`
