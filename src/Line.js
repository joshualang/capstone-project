import styled from "styled-components/macro"
import colors from "./common/styles/colors"

export default styled.div`
  width: 100%;
  background: ${colors.greySemi};
  padding: 1px 0 0;
  margin: ${props => props.margin || "8px 0 8px"};
`
