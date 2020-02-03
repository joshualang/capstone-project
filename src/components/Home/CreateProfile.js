import React from 'react'
import styled from 'styled-components/macro'
import SectionText from '../common/text/SectionText'
import TextInput from '../common/TextInput'
import SubmitButton from '../common/SubmitButton'

import useCreateProfile from '../../hooks/createProfile'
import { isValidDate } from '../../helper/dateHelper'

export default function CreateProfile(uid, idToken) {
  const { handleChange, handleSubmit, values } = useCreateProfile(uid, idToken)

  return (
    <form onSubmit={handleSubmit} onChange={handleChange}>
      <SectionText>Neues Profil hinzufügen</SectionText>
      <Indent>
        <TextInput value={values.name} name="name" valid={values.name}>
          Name
        </TextInput>
        <TextInput
          value={values.birth}
          name="birth"
          valid={isValidDate(values.birth)}
        >
          Geburtsdatum
        </TextInput>
        {!!values.name && isValidDate(values.birth) ? (
          <SubmitButton isActive={true}>Profil hinzufügen</SubmitButton>
        ) : (
          <SubmitButton disabled>Profil hinzufügen</SubmitButton>
        )}
      </Indent>
    </form>
  )
}

const Indent = styled.div`
  padding-left: 8px;
`
