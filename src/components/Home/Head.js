import React from 'react'
import styled from 'styled-components/macro'
import Line from '../common/Line'
import back from '../../img/ios-back.svg'
import SectionText from '../common/text/SectionText'
import Fadeout from '../common/Fadeout'

export default function({
  topRight,
  onTopLeftClick = () => window.history.back(),
  headline,
}) {
  return (
    <>
      <Header>
        <Grid>
          <img
            height="18px"
            width="18px"
            onClick={onTopLeftClick}
            src={back}
            alt="back"
          ></img>
          <SectionText textAlign="center">{headline}</SectionText>
          <div>{topRight}</div>
        </Grid>
        <Line margin="16px 0 0" />
        <Fadeout />
      </Header>
    </>
  )
}
const Grid = styled.div`
  display: grid;
  grid-template-columns: 14px auto 14px;
  align-items: center;
  justify-items: center;
  width: 100%;
`

const Header = styled.header`
  position: relative;
`
