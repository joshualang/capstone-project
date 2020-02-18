import { useState } from 'react'
import {
  signInWithEmail,
  signUpWithEmail,
} from '../components/LandingScreen/Auth/AuthServices'

export function useLogin() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    message: '',
  })

  const handleSubmit = event => {
    event.preventDefault()
    console.log('submit')
    signInWithEmail(values.email, values.password)
      .then(res => {
        setValues({ ...values, message: res })
      })
      .catch(err => setValues({ ...values, message: err }))
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

export function useRegistration() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    birth: '',
    name: '',
    message: '',
  })

  const handleSubmit = event => {
    event.preventDefault()
    console.log('submit')
    signUpWithEmail(values.email, values.password, values.name, values.birth)
      .then(res => {
        setValues({ ...values, message: res })
      })
      .catch(err => setValues({ ...values, message: err }))
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
