import React from "react"
import styled from "styled-components/macro"
import Headline from "./common/Text/Headline"

export default function Header() {
  return (
    <HeaderStyled>
      <Headline>Dein Impfpass</Headline>
    </HeaderStyled>
  )
}
const HeaderStyled = styled.header`
  position: absolute;
  top: 0;
  height: 20vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`
