import React from 'react'
import isValidEmail from './isValidEmail'
import { useLogin } from '../../../hooks/useAuth'

import Text from '../../common/text/Text'
import TextInput from '../../common/TextInput'
import SubmitButton from '../../common/SubmitButton'
import Nav from './Nav'

export default function RegisterWithEmail() {
  const { handleChange, handleSubmit, values } = useLogin()
  return (
    <>
      <Nav>Einloggen</Nav>
      <form onChange={handleChange} onSubmit={handleSubmit}>
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
        <Text>{values.message}</Text>
        <SubmitButton
          isActive={isValidEmail(values.email) && values.password.length > 7}
        >
          Einloggen
        </SubmitButton>
      </form>
    </>
  )
}
