import React, { useState, useRef } from 'react'
import styled from 'styled-components/macro'
import Head from '../Head'

import { Link } from 'react-router-dom'
import checkmark from '../img/checkmark.svg'
import PersonalInformation from './PersonalInformation'
import DiseasesSelected from './DiseasesSelected'

import { stringifyDate, isValidDate } from '../dateHelper'

export default function({
  userAge,
  userName,
  updateSettingsInBackend,
  diseases,
}) {
  const refSubmit = useRef(null)
  const [settings, setSettings] = useState({
    name: userName,
    age: stringifyDate(new Date(userAge)),
    diseases: { ...diseases },
  })

  function onFormNameChange(event) {
    setSettings({ ...settings, name: event.target.value })
  }
  function onFormBirthChange(event) {
    setSettings({ ...settings, age: event.target.value })
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
              age: settings.age,
              settings: settings.diseases,
            })
            window.location.href = '/'
          }}
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
