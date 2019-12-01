import styled, { createGlobalStyle } from "styled-components/macro"

export default createGlobalStyle`
*{
   scrollbar-width: none;
    box-sizing: border-box;
    ::-webkit-scrollbar {
    display: none;
    }
}
#root{

    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left:0;
    background: rgb(232, 179, 161);
  background: linear-gradient(
    0deg,
    rgba(252, 182, 159, 1) 80%,
    rgba(255, 236, 210, 1) 100%
  );
}
a {
  text-decoration: none;
}
`
