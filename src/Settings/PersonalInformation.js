import React from 'react'
import styled from 'styled-components/macro'
import SectionText from '../common/text/SectionText'
import TextInput from '../TextInput'

export default function PersonalInformation({
  onFormNameChange,
  settings,
  onFormBirthChange,
  isValidDate,
}) {
  return (
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
  )
}

const Indent = styled.div`
  padding-left: 8px;
`
