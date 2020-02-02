import React, { useState, useRef } from 'react'
import styled from 'styled-components/macro'
import Head from '../Head'

import { Link } from 'react-router-dom'
import checkmark from '../../../img/checkmark.svg'
import PersonalInformation from './PersonalInformation'
import DiseasesSelected from './DiseasesSelected'

import { stringifyDate, isValidDate } from '../../../helper/dateHelper'

import useSettings from '../../../hooks/settings'

export default function({
  userBirth,
  userName,
  updateSettingsInBackend,
  diseases,
  setLastRefresh,
}) {
  const { handleChange, handleSubmit, values } = useSettings(() =>
    console.log('custom hook')
  )
  const refSubmit = useRef(null)
  const [settings, setSettings] = useState({
    name: userName,
    birth: stringifyDate(new Date(userBirth)),
    diseases: { ...diseases },
  })

  function onFormNameChange(event) {
    setSettings({ ...settings, name: event.target.value })
  }
  function onFormBirthChange(event) {
    setSettings({ ...settings, birth: event.target.value })
  }
  function onDiseaseChange(disease, event) {
    setSettings({
      ...settings,
      diseases: { ...settings.diseases, [disease]: event.target.checked },
    })
  }
  return (
    <>
      <Head
        headline="Einstellungen"
        topRight={
          <Link to="/" onClick={() => refSubmit.current.click()}>
            <img height="18px" width="18px" src={checkmark} alt="submit" />
          </Link>
        }
      />
      <Container>
        <Settings
          onSubmit={event => {
            event.preventDefault()
            updateSettingsInBackend({
              name: settings.name,
              birth: settings.birth,
              settings: settings.diseases,
            })
            setLastRefresh(new Date())
          }}
          onChange={handleChange}
        >
          <div>
            <PersonalInformation
              settings={settings}
              onFormNameChange={onFormNameChange}
              onFormBirthChange={onFormBirthChange}
              isValidDate={isValidDate}
            ></PersonalInformation>
          </div>
          <div>
            <DiseasesSelected
              onDiseaseChange={onDiseaseChange}
              settings={settings}
            ></DiseasesSelected>
          </div>
          <button
            ref={refSubmit}
            type="submit"
            style={{ display: 'none' }}
          ></button>
        </Settings>
      </Container>
    </>
  )
}

const Settings = styled.form`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-right: 4px;
`
const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
`
