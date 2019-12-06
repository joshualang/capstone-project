import React from 'react'
import styled from 'styled-components/macro'
import colors from './common/styles/colors'
import { Link } from 'react-router-dom'

import Text from './common/text/Text'

export default function({ onMoreDropdownMenuClick }) {
  return (
    <>
      <MoreDropdownMenu>
        <Link to="/addvaccination" onClick={() => onMoreDropdownMenuClick()}>
          <Text color="black">Impfung hinzufügen</Text>
        </Link>
      </MoreDropdownMenu>
      <ClickableArea onClick={() => onMoreDropdownMenuClick()}></ClickableArea>
    </>
  )
}

const MoreDropdownMenu = styled.div`
  position: absolute;
  z-index: 5;
  top: 20px;
  right: 20px;
  display: inline-flex;
  background: ${colors.white};
  padding: 8px 24px 0px;
  box-shadow: 8px 0px 16px rgb(48, 48, 48, 0.2);
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
`
const ClickableArea = styled.div`
  position: absolute;
  z-index: 4;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`
