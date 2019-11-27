import React from "react"
import Main from "./Main"
import GlobalStyles from "./GlobalStyles"
import Header from "./Header"

import vaccinationServices from "./vaccinationServices"
import vaccinationRecommendations from "./vaccinationRecommendations.json"
import vaccinationsMade from "./vaccinationsMade.json"

const user = {
  age: "2019 09 29"
}

function App() {
  const vaccinationsDue = vaccinationServices(
    user.age,
    vaccinationsMade,
    vaccinationRecommendations
  )
  return (
    <div className="App">
      <>
        <GlobalStyles />
        <Header />
        <Main data={vaccinationsDue}></Main>
      </>
    </div>
  )
}

export default App
