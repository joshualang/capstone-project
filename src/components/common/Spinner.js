import styled from 'styled-components/macro'
import colors from './styles/colors'

export default styled.div`
  display: block;
  width: 30px;
  height: 30px;
  border: 3px solid transparent;
  border-radius: 50%;
  border-right-color: ${colors.grey};
  animation: spinner-anim 0.8s linear infinite;
  width: 30px;
  height: 30px;
  margin: auto;
  transform: translate(-50%, -50%);

  @keyframes spinner-anim {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
`
