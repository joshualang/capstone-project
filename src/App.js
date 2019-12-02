import React, { useState } from "react"
import { Switch, Route } from "react-router-dom"
import { useSpring, animated } from "react-spring"

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
  const props = useSpring({
    config: { tension: 5000, mass: 1, friction: 300 },
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(100%)" }
  })

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
          <Main style={props}>
            <Vaccinations data={data}></Vaccinations>
          </Main>
        </Route>
        <Route path="/addvaccination">
          <Main style={props} fullscreen="true">
            <VaccinationForm></VaccinationForm>
          </Main>
        </Route>
        <Route path="/vaccinationdetails/:id">
          <Main style={props} fullscreen="true">
            <VaccinationDetails data={data}></VaccinationDetails>
          </Main>
        </Route>
      </Switch>
    </>
  )
}

export default App
