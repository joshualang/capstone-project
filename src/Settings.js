import React, { useState } from 'react'
import Head from './Head'
import SectionText from './common/text/SectionText'
import { Link } from 'react-router-dom'
import checkmark from './img/checkmark.svg'

export default function Settings() {
  const [settings, setSettings] = useState({
    name: 'Jens',
    age: 'date',
    diseases: {
      Rotaviren: true,
      Tetanus: true,
      Diphterie: true,
      Pertussis: true,
      Hib: true,
      Polio: true,
      HepatitisB: true,
      Pneumokokken: true,
      MeningokokkenC: true,
    },
  })

  return (
    <>
      <Head
        headline="Einstellungen"
        topRight={
          <Link to="/">
            <img height="18px" width="18px" src={checkmark} alt="submit" />
          </Link>
        }
      />
      <div style={{ marginTop: 16 }}>
        <SectionText>Deine Daten</SectionText>
        <SectionText>Benachrichtigungen</SectionText>
        <SectionText>Abgedeckte Krankheiten</SectionText>
      </div>
    </>
  )
}
