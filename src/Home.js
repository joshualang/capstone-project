import React, { useState, useRef } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import { useTransition } from 'react-spring'
import useHeight from './hooks/useHeight'

import Main from './Main'
import Header from './Header'
import Navigation from './Navigation'

import VaccinationsMade from './VaccinationsMade'
import VaccinationsOpen from './VaccinationsOpen'
import VaccinationDetails from './VaccinationDetails'
import AddVaccination from './AddVaccinationForm/AddVaccination'
import MoreDropdownMenu from './MoreDropdownMenu'
import Settings from './Settings/Settings'
import Spinner from './Spinner'

import useLoadingEffect from './hooks/useLoadingEffect'
import { patchData, updateSettings } from './services'
import { isValidDate, nowAsString } from './dateHelper'

export default function Home({ user }) {
  const [lastRefresh, setLastRefresh] = useState(new Date())
  const { data, isLoading } = useLoadingEffect(user, lastRefresh)
  console.log(data)
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
      console.log(currentProfile)
      setLastRefresh(new Date())
    }
  }

  function onFormSubmit(res) {
    setForm({ ...form, isSubmitted: res })
    setLastRefresh(new Date())
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
  function sendDataToBackend(data) {
    return patchData(user.uid, user._lat, data)
  }

  function updateSettingsInBackend(settings) {
    setLastRefresh(new Date())
    return updateSettings(user.uid, user._lat, settings)
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
        <Navigation
          refresh={setLastRefresh}
          onMenuClick={onMenuClick}
          currentProfile={[data.name]}
          changeProfile={changeProfile}
        />
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
                sendDataToBackend={sendDataToBackend}
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
                  updateSettingsInBackend={updateSettingsInBackend}
                  userName={data.name}
                  userAge={data.age}
                  diseases={data.settings}
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
