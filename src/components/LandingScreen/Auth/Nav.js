import React from 'react'
import styled from 'styled-components/macro'
import Title from '../../common/text/Title'
import Line from '../../common/Line'
import { Link } from 'react-router-dom'

const back = require('../../../img/ios-back.svg')

export default function({ children }) {
  return (
    <Wrapper>
      <Nav>
        <Link to="/" style={{ width: '100%', height: '100%' }}>
          <img src={back}></img>
        </Link>
        <Title textAlign="center" style={{ width: '100%' }}>
          {children}
        </Title>
      </Nav>
      <Line></Line>
    </Wrapper>
  )
}

const Nav = styled.div`
  display: grid;
  grid-template-columns: 48px auto 48px;
  justify-items: start;
  align-items: stretch;
`
const Wrapper = styled.div`
  padding-bottom: 8px;
`
