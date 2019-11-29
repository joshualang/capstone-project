import styled from "styled-components/macro"
import React from "react"
import TimeAgo from "react-timeago"
import germanStrings from "react-timeago/lib/language-strings/de"
import buildFormatter from "react-timeago/lib/formatters/buildFormatter"

import colors from "./common/styles/colors"
import Title from "./common/text/Title"
import DetailsText from "./common/text/DetailsText"

export default function Vaccination({
  vaccination,
  date,
  doctor,
  vaccinationOnClick,
  index
}) {
  const formatter = buildFormatter(germanStrings)

  return (
    <>
      <VaccinationStyled onClick={() => vaccinationOnClick(index)}>
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
