import React from "react"
import styled from "styled-components/macro"
import Vaccination from "./Vaccination"
import colors from "./colors"

export default function Main({ data }) {
  return (
    <MainStyled>
      {data.map(item => (
        <Vaccination
          vaccination={item.vaccination}
          date={item.date}
          doctor={item.doctor}
        ></Vaccination>
      ))}
    </MainStyled>
  )
}

const MainStyled = styled.main`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80vh;
  background: ${colors.white};
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding: 24px;
  overflow-y: scroll;
`
