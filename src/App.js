import React, { useState } from "react"
import { Switch, Route } from "react-router-dom"

import Main from "./Main"
import Header from "./Header"

import vaccinationServices from "./vaccinationServices"
import vaccinationRecommendations from "./vaccinationRecommendations.json"
import vaccinationsMade from "./vaccinationsMade.json"
import VaccinationForm from "./VaccinationForm"
import VaccinationDetails from "./VaccinationDetails"
import Navigation from "./Navigation"

const user = {
  age: "2019 10 20"
}

function App() {
  const [isMenuShown, setIsMenuShown] = useState(false)
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
  function onMenuClick() {
    setIsMenuShown(!isMenuShown)
  }

  return (
    <>
      {isMenuShown ? <Navigation onMenuClick={onMenuClick} /> : ""}
      <Switch>
        <Route path="/home">
          <Header onMenuClick={onMenuClick} showTitle="true" />
          <Main
            data={vaccination}
            vaccinationOnClick={vaccinationOnClick}
          ></Main>
        </Route>
        <Route path="/addvaccination">
          <Header onMenuClick={onMenuClick} />
          <Main fullscreen="true">
            <VaccinationForm></VaccinationForm>
          </Main>
        </Route>
        <Route path="/vaccinationdetails">
          <Header onMenuClick={onMenuClick} />
          <Main fullscreen="true">
            <VaccinationDetails></VaccinationDetails>
          </Main>
        </Route>
      </Switch>
    </>
  )
}

export default App
