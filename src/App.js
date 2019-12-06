import React, { useState } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import { useTransition } from 'react-spring'

import Main from './Main'
import Header from './Header'
import Navigation from './Navigation'

import Vaccinations from './Vaccinations'
import VaccinationDetails from './VaccinationDetails'
import VaccinationForm from './VaccinationForm'
import MoreDropdownMenu from './MoreDropdownMenu'
import Spinner from './Spinner'

import useLoadingEffect from './hooks/useLoadingEffect'

function App() {
  const { data, isLoading } = useLoadingEffect()
  const [isMoreDropdownMenuShown, setIsMoreDropdownMenuShown] = useState(false)
  const [isMenuShown, setIsMenuShown] = useState(false)
  function onMenuClick() {
    setIsMenuShown(!isMenuShown)
  }
  function onMoreDropdownMenuClick() {
    setIsMoreDropdownMenuShown(!isMoreDropdownMenuShown)
  }

  const location = useLocation()
  const animationConfig = {
    config: { tension: 3000, mass: 1, friction: 200 },
    from: { transform: 'translateY(100%)' },
    enter: { transform: 'translateY(0)' },
    leave: { transform: 'translateY(100%)' },
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
        ''
      )}
      {isMoreDropdownMenuShown ? (
        <MoreDropdownMenu
          onMoreDropdownMenuClick={onMoreDropdownMenuClick}
        ></MoreDropdownMenu>
      ) : (
        ''
      )}
      <Header
        onMenuClick={onMenuClick}
        onMoreDropdownMenuClick={onMoreDropdownMenuClick}
      />
      {transitions.map(({ item, props, key }) => (
        <Main key={key} style={props}>
          <Switch location={item}>
            <Route path="/addvaccination">
              <VaccinationForm></VaccinationForm>
            </Route>
            <Route path="/vaccinationdetails/:id">
              {isLoading ? (
                <Spinner/>
              
              ) : (
                <VaccinationDetails data={data}></VaccinationDetails>
              )}
            </Route>
            <Route path="/home">
              {isLoading ? (
                 <Spinner/>
              
              ) : (
                <Vaccinations data={data}></Vaccinations>
              )}
            </Route>
          </Switch>
        </Main>
      ))}
    </>
  )
}

export default App
