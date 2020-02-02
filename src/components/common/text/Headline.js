import styled from 'styled-components/macro'
import colors from '../styles/colors'

export default styled.h1`
  font-family: sans-serif;
  margin: 16px 0;
  color: ${props => props.color || colors.white};
  text-align: ${props => props.textAlign || 'center'};
`
