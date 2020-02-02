import styled from 'styled-components/macro'
import colors from './styles/colors'

export default styled.button`
  align-self: flex-start;
  border-radius: 16px;
  border: 2px solid blue;
  width: 80px;
  height: 32px;
  background: ${props => (props.isActive ? colors.blue : 'white')};
  color: ${props => (props.isActive ? 'white' : colors.blue)};
`
