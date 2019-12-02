import React, { useState } from "react"
import { Switch, Route, useLocation } from "react-router-dom"
import { useSpring, useTransition, animated } from "react-spring"

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
  //rect-spring trasition
  const location = useLocation()
  console.log("location", location)
  const animationConfig = {
    config: { tension: 3000, mass: 1, friction: 200 },
    from: { transform: "translateY(100%)" },
    enter: { transform: "translateY(0)" },
    leave: { transform: "translateY(100%)" }
  }

  const transitions = useTransition(
    location,
    location => location.pathname,
    animationConfig
  )
  console.log(transitions)
  return (
    <>
      {isMenuShown ? (
        <Navigation profile={data.name} onMenuClick={onMenuClick} />
      ) : (
        ""
      )}
      <Header onMenuClick={onMenuClick} showTitle="true" />
      {transitions.map(({ item, props, key }) => (
        <Main key={key} style={props}>
          {console.log("item", item, "props", props, "key", key)}
          <Switch location={item}>
            <Route path="/home">
              <Vaccinations data={data}></Vaccinations>
            </Route>
            <Route path="/addvaccination">
              <VaccinationForm></VaccinationForm>
            </Route>
            <Route path="/vaccinationdetails/:id">
              <VaccinationDetails data={data}></VaccinationDetails>
            </Route>
          </Switch>
        </Main>
      ))}
    </>
  )
}

export default App
