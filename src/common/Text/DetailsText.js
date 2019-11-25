import styled from "styled-components/macro"
import colors from "../../colors"

export default styled.span`
  color: ${colors.grey};
  font-family: Helvetica, sans-serif;
  font-size: 0.75rem;
  font-weight: ${props => props.fontWeight};
`
