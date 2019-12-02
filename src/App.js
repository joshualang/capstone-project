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
    config: { tension: 50, mass: 1, friction: 2 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
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
        <animated.div key={key} style={props}>
          {console.log("item", item, "props", props, "key", key)}
          <Switch location={item}>
            <Route path="/home">
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
        </animated.div>
      ))}
    </>
  )
}

export default App
