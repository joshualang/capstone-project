import React from 'react'
import styled from 'styled-components/macro'
import SectionText from '../../common/text/SectionText'
import TextInput from '../../common/TextInput'

export default function PersonalInformation({ values, isValidDate }) {
  return (
    <div>
      <SectionText>Deine Daten</SectionText>
      <Indent>
        <TextInput value={values.name} valid={values.name} name="name">
          Name
        </TextInput>
        <TextInput
          value={values.birth}
          valid={isValidDate(values.birth)}
          name="birth"
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
