import React, { useState, useRef } from 'react'
import styled from 'styled-components/macro'
import Head from './Head'
import SectionText from './common/text/SectionText'
import { Link } from 'react-router-dom'
import checkmark from './img/checkmark.svg'
import ToggleSwitchInput from './ToggleSwitchInput'
import TextInput from './TextInput'
import DetailsText from './common/text/DetailsText'

import { stringifyDate, isValidDate } from './dateHelper'
import { updateUserDisplayName } from './Auth/AuthServices'

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
  console.log(settings)
  function onFormNameChange(event) {
    setSettings({ ...settings, name: event.target.value })
  }
  function onFormBirthChange(event) {
    setSettings({ ...settings, age: event.target.value })
  }
  function onDiseaseChange(disease, event) {
    console.log(event.target.checked)
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
      <Settings
        onSubmit={event => {
          event.preventDefault()
          settings.name !== userName && updateUserDisplayName(settings.name)
          updateSettingsInBackend({
            age: settings.age,
            settings: settings.diseases,
          })
        }}
      >
        <div>
          <SectionText>Deine Daten</SectionText>
          <Indent>
            <TextInput
              onChange={onFormNameChange}
              value={settings.name}
              valid={settings.name}
            >
              Name
            </TextInput>
            <TextInput
              onChange={onFormBirthChange}
              value={settings.age}
              valid={isValidDate(settings.age)}
            >
              Geburtsdatum
            </TextInput>
          </Indent>
        </div>
        <div>
          <SectionText>Abgedeckte Krankheiten</SectionText>
          <Indent>
            <ToggleSwitchInput
              onChange={onDiseaseChange}
              value={settings.diseases}
              disease="Rotaviren"
            >
              Rotaviren <DetailsText>(empfohlen)</DetailsText>
            </ToggleSwitchInput>
            <ToggleSwitchInput
              onChange={onDiseaseChange}
              value={settings.diseases}
              disease="Tetanus"
            >
              Tetanus <DetailsText>(empfohlen)</DetailsText>
            </ToggleSwitchInput>
            <ToggleSwitchInput
              onChange={onDiseaseChange}
              value={settings.diseases}
              disease="Diphterie"
            >
              Diphterie <DetailsText>(empfohlen)</DetailsText>
            </ToggleSwitchInput>
            <ToggleSwitchInput
              onChange={onDiseaseChange}
              value={settings.diseases}
              disease="Pertussis"
            >
              Pertussis <DetailsText>(empfohlen)</DetailsText>
            </ToggleSwitchInput>
            <ToggleSwitchInput
              onChange={onDiseaseChange}
              value={settings.diseases}
              disease="Hib"
            >
              Hib <DetailsText>(empfohlen)</DetailsText>
            </ToggleSwitchInput>
            <ToggleSwitchInput
              onChange={onDiseaseChange}
              value={settings.diseases}
              disease="Polio"
            >
              Polio <DetailsText>(empfohlen)</DetailsText>
            </ToggleSwitchInput>
            <ToggleSwitchInput
              onChange={onDiseaseChange}
              value={settings.diseases}
              disease="HepatitisB"
            >
              Hepatitis B <DetailsText>(empfohlen)</DetailsText>
            </ToggleSwitchInput>
            <ToggleSwitchInput
              onChange={onDiseaseChange}
              value={settings.diseases}
              disease="Pneumokokken"
            >
              Pneumokokken <DetailsText>(empfohlen)</DetailsText>
            </ToggleSwitchInput>
            <ToggleSwitchInput
              onChange={onDiseaseChange}
              value={settings.diseases}
              disease="MeningokokkenC"
            >
              Meningokokken C <DetailsText>(empfohlen)</DetailsText>
            </ToggleSwitchInput>
          </Indent>
        </div>
        <button
          ref={refSubmit}
          type="submit"
          style={{ display: 'none' }}
        ></button>
      </Settings>
    </>
  )
}

const Settings = styled.form`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`
const Indent = styled.div`
  padding-left: 8px;
`
