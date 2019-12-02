import styled from "styled-components/macro"
import colors from "./common/styles/colors"
import { animated } from "react-spring"

export default styled(animated.main)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${props => (props.fullscreen ? "95vh" : "80vh")};

  padding: 24px 24px 0;

  background: ${colors.white};
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;

  display: flex;
  flex-direction: column;
`
