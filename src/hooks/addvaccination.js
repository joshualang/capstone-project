import { useState } from 'react'

import { addVaccinationProfile } from '../helper/services'
import { nowAsString } from '../helper/dateHelper'

export default function useAddVaccinations(profileid, idToken) {
  const [values, setValues] = useState({
    date: nowAsString(),
    vaccine: '',
    doctor: '',
  })

  const handleSubmit = event => {
    event.preventDefault()
    addVaccinationProfile(
      profileid,
      idToken,
      values.date,
      values.vaccine,
      values.doctor
    ).then(res => setValues({ submitMessage: res.result }))
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
