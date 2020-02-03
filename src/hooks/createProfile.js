import { useState } from 'react'

import { createProfile } from '../helper/services'

export default function useCreateProfile({ uid, idToken }) {
  const [values, setValues] = useState({
    name: '',
    birth: '',
  })

  const handleSubmit = event => {
    event.preventDefault()
    console.log('submit')
    createProfile(uid, idToken, values.name, values.birth)
  }

  const handleChange = event => {
    event.persist()
    const target = event.target
    const name = target.name
    const value = target.value
    setValues(values => ({
      ...values,
      [name]: value,
    }))
  }

  return {
    handleChange,
    handleSubmit,
    values,
  }
}
