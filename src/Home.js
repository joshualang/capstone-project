import React, { useState } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import { useTransition } from 'react-spring'

import Main from './Main'
import Header from './Header'
import Navigation from './Navigation'

import Vaccinations from './Vaccinations'
import VaccinationDetails from './VaccinationDetails'
import AddVaccination from './AddVaccinationForm/AddVaccination'
import MoreDropdownMenu from './MoreDropdownMenu'
import Settings from './Settings'
import Spinner from './Spinner'

import useLoadingEffect from './hooks/useLoadingEffect'
import { isValidDate, nowAsString } from './dateHelper'

export default function Home({ user }) {
  const { data, isLoading } = useLoadingEffect(user)

  const [form, setForm] = useState({
    doctor: '',
    validDoctor: false,
    date: nowAsString(),
    validDate: true,
    sticker: '',
    validSticker: false,
    userBirth: '24.09.2019',
    infoVisible: false,
    isSubmitted: false,
  })
  const [isMoreDropdownMenuShown, setIsMoreDropdownMenuShown] = useState(false)
  const [isMenuShown, setIsMenuShown] = useState(false)

  function onFormSubmit(res) {
    setForm({ ...form, isSubmitted: res })
  }
  function setFormSubmitBack() {
    setForm({ ...form, isSubmitted: false })
  }
  function onFormInfoVisibleChange() {
    setForm({ ...form, infoVisible: !form.infoVisible })
  }
  function onFormDoctorChange(event) {
    setForm({
      ...form,
      doctor: event.target.value,
      validDoctor: event.target.value,
    })
  }
  function onFormDateChange(event) {
    setForm({
      ...form,
      date: event.target.value,
      validDate: isValidDate(event.target.value),
    })
  }
  function onFormStickerChange(event) {
    setForm({
      ...form,
      sticker: event.target.value,
      validSticker: event.target.value,
    })
  }

  function onMenuClick() {
    setIsMenuShown(!isMenuShown)
  }
  function onMoreDropdownMenuClick() {
    setIsMoreDropdownMenuShown(!isMoreDropdownMenuShown)
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
        <Navigation profile={user.displayName} onMenuClick={onMenuClick} />
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
              <AddVaccination
                form={form}
                setFormSubmitBack={setFormSubmitBack}
                onFormSubmit={onFormSubmit}
                onFormInfoVisibleChange={onFormInfoVisibleChange}
                onFormDoctorChange={onFormDoctorChange}
                onFormDateChange={onFormDateChange}
                onFormStickerChange={onFormStickerChange}
              ></AddVaccination>
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
                  userName={user.displayName}
                  userAge={data.age}
                ></Settings>
              )}
            </Route>
            <Route path="/">
              {isLoading ? (
                <Spinner />
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
