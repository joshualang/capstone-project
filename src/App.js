import React, { useState } from "react"
import Main from "./Main"
import GlobalStyles from "./common/styles/GlobalStyles"
import Header from "./Header"

import vaccinationServices from "./vaccinationServices"
import vaccinationRecommendations from "./vaccinationRecommendations.json"
import vaccinationsMade from "./vaccinationsMade.json"
import VaccinationForm from "./VaccinationForm"

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
  const [vaccination, setVaccination] = useState(vaccinations)
  function vaccinationOnClick(index) {
    const clickedVaccination = !vaccination[index].isOpen
    setVaccination(() => [
      ...vaccination.slice(0, index),
      { ...vaccination[index], isOpen: clickedVaccination },
      ...vaccination.slice(index + 1)
    ])
  }
  return (
    <div className="App">
      <>
        <GlobalStyles />
        <Header />
        <Main data={vaccination} vaccinationOnClick={vaccinationOnClick}>
          <VaccinationForm></VaccinationForm>
        </Main>
      </>
    </div>
  )
}

export default App
