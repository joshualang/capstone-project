import React from 'react'
import styled from 'styled-components/macro'
import Headline from './common/text/Headline'
import menu from './img/menu.svg'
import more from './img/more.svg'

export default function Header({
  onMenuClick,
  showTitle = false,
  onMoreMenuClick,
}) {
  return (
    <HeaderStyled>
      <div>
        <img onClick={() => onMenuClick()} src={menu} alt="menu"></img>
        <img src={more} alt="more" onClick={() => onMoreMenuClick()}></img>
      </div>
      {showTitle ? <Headline>Dein Impfpass</Headline> : ''}
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
  div {
    position: fixed;
    top: 0;
    width: 100%;
    padding: 32px;
    display: flex;
    justify-content: space-between;
    align-self: flex-start;
  }
`
