import styled from 'styled-components/macro'
import colors from '../styles/colors'

export default styled.h2`
  font-family: Helvetica, sans-serif;
  font-size: 1.25rem;
  color: ${colors.balck};
  margin: 0;
  text-align: ${props => props.textAlign || 'inital'};
`
