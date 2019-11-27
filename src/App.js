import React, { useState } from "react"
import Main from "./Main"
import GlobalStyles from "./GlobalStyles"
import Header from "./Header"

import vaccinationServices from "./vaccinationServices"
import vaccinationRecommendations from "./vaccinationRecommendations.json"
import vaccinationsMade from "./vaccinationsMade.json"

const user = {
  age: "2019 10 20"
}

function App() {
  const vaccinations = vaccinationServices(
    user.age,
    vaccinationsMade,
    vaccinationRecommendations
  )
  vaccinations.map(item => (item.isOpen = false))
  const [isVaccinationOpen, setIsVaccinationOpen] = useState(vaccinations)
  function vaccinationOnClick(index) {
    const clickedVaccination = !isVaccinationOpen[index].isOpen
    setIsVaccinationOpen(() => [
      ...isVaccinationOpen.slice(0, index),
      { ...isVaccinationOpen[index], isOpen: clickedVaccination },
      ...isVaccinationOpen.slice(index + 1)
    ])
  }
  return (
    <div className="App">
      <>
        <GlobalStyles />
        <Header />
        <Main
          data={isVaccinationOpen}
          vaccinationOnClick={vaccinationOnClick}
        ></Main>
      </>
    </div>
  )
}

export default App
