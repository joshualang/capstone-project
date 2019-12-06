import styled from 'styled-components/macro'

import colors from '../styles/colors'

export default styled.h3`
  font-family: Helvetica, sans-serif;
  font-weight: 300;
  font-size: 1rem;
  color: ${props => props.color || colors.grey};
  margin: 0;
  padding: 0 0 8px;
`
