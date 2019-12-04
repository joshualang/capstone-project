import React, { useState, useEffect } from "react"
import { Switch, Route, useLocation } from "react-router-dom"
import { useTransition } from "react-spring"
import { getData } from "./services"

import Main from "./Main"
import Header from "./Header"
import Navigation from "./Navigation"

import Vaccinations from "./Vaccinations"
import VaccinationDetails from "./VaccinationDetails"
import VaccinationForm from "./VaccinationForm"

import defaultData from "./empty.json"

// const network = fetch("http://localhost:3334/ZA1U8UchFPV5nk7ZuICs")
//   .then(res => res.json())
//   .then(response => {
//     console.log(response)
//     return response
//   })
//   .catch(err => console.log("--->", err))

function App() {
  const [data, setData] = useState(defaultData)
  const [isMenuShown, setIsMenuShown] = useState(false)

  useEffect(() => {
    getData().then(setData)
  }, [])
  console.log(data)
  function onMenuClick() {
    setIsMenuShown(!isMenuShown)
  }
  const location = useLocation()
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
          <Switch location={item}>
            <Route path="/addvaccination">
              <VaccinationForm></VaccinationForm>
            </Route>
            <Route path="/vaccinationdetails/:id">
              <VaccinationDetails data={data}></VaccinationDetails>
            </Route>
            <Route path="/home">
              <Vaccinations data={data}></Vaccinations>
            </Route>
          </Switch>
        </Main>
      ))}
    </>
  )
}

export default App
