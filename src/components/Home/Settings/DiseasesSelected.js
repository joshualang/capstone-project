import React from 'react'
import styled from 'styled-components/macro'

import ToggleSwitchInput from '../../common/ToggleSwitchInput'
import DetailsText from '../../common/text/DetailsText'
import SectionText from '../../common/text/SectionText'

export default function DiseasesSelected({ onDiseaseChange, settings }) {
  return (
    <div>
      <SectionText>Abgedeckte Krankheiten</SectionText>
      <Indent>
        <ToggleSwitchInput
          onChange={onDiseaseChange}
          value={settings.diseases}
          disease="Masern"
        >
          Masern <DetailsText>(vorgeschrieben)</DetailsText>
        </ToggleSwitchInput>
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
          disease="Diphtherie"
        >
          Diphtherie <DetailsText>(empfohlen)</DetailsText>
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
          disease="Hepatitis B"
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
        <ToggleSwitchInput
          onChange={onDiseaseChange}
          value={settings.diseases}
          disease="Mumps"
        >
          Mumps <DetailsText>(empfohlen)</DetailsText>
        </ToggleSwitchInput>
        <ToggleSwitchInput
          onChange={onDiseaseChange}
          value={settings.diseases}
          disease="Varizellen"
        >
          Varizellen <DetailsText>(empfohlen)</DetailsText>
        </ToggleSwitchInput>
        <ToggleSwitchInput
          onChange={onDiseaseChange}
          value={settings.diseases}
          disease="HPV"
        >
          HPV <DetailsText>(empfohlen)</DetailsText>
        </ToggleSwitchInput>
        <ToggleSwitchInput
          onChange={onDiseaseChange}
          value={settings.diseases}
          disease="HerpesZoster"
        >
          Herpes Zoster <DetailsText>(empfohlen)</DetailsText>
        </ToggleSwitchInput>
        <ToggleSwitchInput
          onChange={onDiseaseChange}
          value={settings.diseases}
          disease="Influenza"
        >
          Influenza <DetailsText>(empfohlen)</DetailsText>
        </ToggleSwitchInput>
      </Indent>
    </div>
  )
}

const Indent = styled.div`
  padding-left: 8px;
`
