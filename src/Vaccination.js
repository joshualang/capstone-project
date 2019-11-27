import styled from "styled-components/macro"
import React from "react"
import TimeAgo from "react-timeago"
import germanStrings from "react-timeago/lib/language-strings/de"
import buildFormatter from "react-timeago/lib/formatters/buildFormatter"

import Title from "./common/Text/Title"
import DetailsText from "./common/Text/DetailsText"
import colors from "./colors"

export default function Vaccination({ vaccination, date, doctor }) {
  const formatter = buildFormatter(germanStrings)
  return (
    <VaccinationStyled>
      <Title>{vaccination}</Title>
      <Details>
        <DetailsText fontWeight="Bold">
          <TimeAgo date={date} formatter={formatter} />
        </DetailsText>
        <DetailsText>{doctor}</DetailsText>
      </Details>
    </VaccinationStyled>
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
const Details = styled.div`
  display: flex;
  justify-content: space-between;
`
