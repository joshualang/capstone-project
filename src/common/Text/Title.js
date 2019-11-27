import styled from "styled-components/macro"
import colors from "../../colors"

export default styled.h3`
  font-family: Helvetica, sans-serif;
  font-size: 1.125rem;
  text-align: ${props => props.textAlign || "inital"};
  color: ${colors.balck};
  margin: 0;
`
