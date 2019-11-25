import React from "react"
import Main from "./Main"
import GlobalStyles from "./GlobalStyles"
import Header from "./Header"
import cards from "./cards.json"

function App() {
  return (
    <div className="App">
      <>
        <GlobalStyles></GlobalStyles>
        <Header></Header>
        <Main data={cards}></Main>
      </>
    </div>
  )
}

export default App
