import React, { useState } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import { useTransition } from 'react-spring'

import Main from './Main'
import Header from './Header'
import Navigation from './Navigation'

import VaccinationsMade from './VaccinationsMade'
import VaccinationsOpen from './VaccinationsOpen'
import VaccinationDetails from './VaccinationDetails'
import AddVaccination from './AddVaccinationForm/AddVaccination'
import Settings from './Settings/Settings'
import Spinner from '../common/Spinner'

import useLoadingEffect from '../../hooks/useLoadingEffect'

export default function Home({ user }) {
  const [lastRefresh, setLastRefresh] = useState(new Date())
  const { data, profiles, isLoading } = useLoadingEffect(user, lastRefresh)
  const [isMenuShown, setIsMenuShown] = useState(false)
  const [currentProfile, setCurrentProfile] = useState([
    'Tommy',
    'Jens',
    'Lisa',
  ])
  function changeProfile(index) {
    if (index !== 0) {
      setCurrentProfile([
        currentProfile[index],
        ...currentProfile.slice(0, index),
        ...currentProfile.slice(index + 1),
      ])
      setLastRefresh(new Date())
    }
  }

  function onMenuClick() {
    setIsMenuShown(!isMenuShown)
  }

  const location = useLocation()
  const animationConfig = {
    config: { tension: 1000, mass: 1, friction: 100 },
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
        <Navigation
          refresh={setLastRefresh}
          onMenuClick={onMenuClick}
          currentProfile={[data.name]}
          changeProfile={changeProfile}
        />
      ) : (
        ''
      )}

      <Header onMenuClick={onMenuClick} />
      {transitions.map(({ item, props, key }) => (
        <Main key={key} style={props}>
          <Switch location={item}>
            <Route path="/addvaccination">
              {isLoading ? (
                <Spinner />
              ) : (
                <AddVaccination
                  profileid={data._id}
                  idToken={user._lat}
                ></AddVaccination>
              )}
            </Route>
            <Route path="/vaccinationdetails/:id">
              {isLoading ? (
                <Spinner />
              ) : (
                <VaccinationDetails data={data}></VaccinationDetails>
              )}
            </Route>
            <Route path="/settings">
              {isLoading ? (
                <Spinner />
              ) : (
                <Settings
                  profileid={data._id}
                  idToken={user._lat}
                  userName={data.name}
                  userBirth={data.birth}
                  settings={data.settings}
                ></Settings>
              )}
            </Route>
            <Route path="/vaccinationsOpen">
              {isLoading ? (
                <Spinner />
              ) : (
                <VaccinationsOpen
                  data={data.vaccinationsOpen}
                ></VaccinationsOpen>
              )}
            </Route>
            <Route path="/">
              {isLoading ? (
                <Spinner />
              ) : (
                <VaccinationsMade
                  data={data.vaccinationsMade}
                ></VaccinationsMade>
              )}
            </Route>
          </Switch>
        </Main>
      ))}
    </>
  )
}
