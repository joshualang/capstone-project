import React, { useState } from 'react'
import styled from 'styled-components/macro'

import TextInput from '../TextInput'

export default function RegisterWithEmail() {
  const [registrationData, setRegistrationData] = useState({
    email: '',
    password: '',
  })
  return (
    <div>
      <TextInput type="email">E-Mail</TextInput>
      <TextInput type="password">Passwort</TextInput>
    </div>
  )
}
