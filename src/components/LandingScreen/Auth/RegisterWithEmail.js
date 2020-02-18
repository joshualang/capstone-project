import React, { useState } from 'react'
import { signUpWithEmail } from './AuthServices'
import { isValidDate } from '../../../helper/dateHelper'
import isValidEmail from './isValidEmail'
import { useRegistration } from '../../../hooks/useAuth'

import Text from '../../common/text/Text'
import TextInput from '../../common/TextInput'
import SubmitButton from '../../common/SubmitButton'
import Nav from './Nav'

export default function RegisterWithEmail() {
  const { handleChange, handleSubmit, values } = useRegistration()
  return (
    <>
      <Nav>Registrieren</Nav>
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <TextInput name="email" type="email" valid={isValidEmail(values.email)}>
          E-Mail
        </TextInput>
        <TextInput
          name="password"
          type="password"
          valid={values.password.length > 7}
        >
          Passwort
        </TextInput>
        <TextInput name="name" type="text" valid={values.name}>
          Name
        </TextInput>
        <TextInput name="birth" type="text" valid={isValidDate(values.birth)}>
          Geburtsdatum
        </TextInput>
        <Text>{values.message}</Text>
        <SubmitButton
          isActive={
            isValidEmail(values.email) &&
            values.password.length > 7 &&
            values.name &&
            isValidDate(values.birth)
          }
        >
          Registrieren
        </SubmitButton>
      </form>
    </>
  )
}
