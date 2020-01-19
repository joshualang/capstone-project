import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { signUpWithEmail } from './AuthServices'
import AuthCard from './AuthCard'
import { isValidDate } from '../dateHelper'
import isValidEmail from './isValidEmail'

import TextInput from '../TextInput'
import SubmitButton from '../common/SubmitButton'

export default function RegisterWithEmail() {
  const [registrationData, setRegistrationData] = useState({
    email: '',
    password: '',
    name: '',
    birth: '',
  })
  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        signUpWithEmail(
          registrationData.email,
          registrationData.password,
          registrationData.name,
          registrationData.birth
        )
      }}
    >
      <TextInput
        onChange={event =>
          setRegistrationData({
            ...registrationData,
            email: event.target.value,
          })
        }
        type="email"
        valid={isValidEmail(registrationData.email)}
      >
        E-Mail
      </TextInput>
      <TextInput
        onChange={event =>
          setRegistrationData({
            ...registrationData,
            password: event.target.value,
          })
        }
        type="password"
        valid={registrationData.password.length > 7}
      >
        Passwort
      </TextInput>
      <TextInput
        onChange={event =>
          setRegistrationData({
            ...registrationData,
            name: event.target.value,
          })
        }
        valid={registrationData.name}
      >
        Name
      </TextInput>
      <TextInput
        onChange={event =>
          setRegistrationData({
            ...registrationData,
            birth: event.target.value,
          })
        }
        valid={isValidDate(registrationData.birth)}
      >
        Geburtsdatum
      </TextInput>
      <SubmitButton
        isActive={
          isValidEmail(registrationData.email) &&
          registrationData.password > 7 &&
          registrationData.name &&
          isValidDate(registrationData.birth)
        }
      >
        Registrieren
      </SubmitButton>
    </form>
  )
}
