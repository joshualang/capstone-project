import styled from 'styled-components/macro'
import colors from '../styles/colors'

export default styled.span`
  color: ${colors.grey};
  font-family: Helvetica, sans-serif;
  font-size: 0.75rem;
  font-weight: 100;
  font-weight: ${props => props.fontWeight};
`
