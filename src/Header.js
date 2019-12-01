import React from "react"
import styled from "styled-components/macro"
import Headline from "./common/text/Headline"
import menu from "./img/menu.svg"
import more from "./img/more.svg"
import { Link } from "react-router-dom"

export default function Header({ onMenuClick, showTitle = false }) {
  return (
    <HeaderStyled>
      <div>
        <img onClick={() => onMenuClick()} src={menu}></img>
        <Link to="/addvaccination">
          <img src={more}></img>
        </Link>
      </div>
      {showTitle ? <Headline>Dein Impfpass</Headline> : ""}
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
