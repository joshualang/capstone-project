import React, { useState } from "react"
import { Switch, Route } from "react-router-dom"

import Main from "./Main"
import Header from "./Header"
import Navigation from "./Navigation"

import Vaccinations from "./Vaccinations"
import VaccinationDetails from "./VaccinationDetails"
import VaccinationForm from "./VaccinationForm"

import mockUpData from "./mockUpData.json"
const data = mockUpData[0]

function App() {
  const [isMenuShown, setIsMenuShown] = useState(false)

  function onMenuClick() {
    setIsMenuShown(!isMenuShown)
  }

  return (
    <>
      {isMenuShown ? (
        <Navigation profile={data.name} onMenuClick={onMenuClick} />
      ) : (
        ""
      )}
      <Switch>
        <Route path="/home">
          <Header onMenuClick={onMenuClick} showTitle="true" />
          <Main>
            <Vaccinations data={data}></Vaccinations>
          </Main>
        </Route>
        <Route path="/addvaccination">
          <Main fullscreen="true">
            <VaccinationForm></VaccinationForm>
          </Main>
        </Route>
        <Route path="/vaccinationdetails/:id">
          <Main fullscreen="true">
            <VaccinationDetails data={data}></VaccinationDetails>
          </Main>
        </Route>
      </Switch>
    </>
  )
}

export default App
