import React from 'react'
import VaccinationForm from './VaccinationForm'
import VaccinationFormFailure from './VaccinationFormFailure'
import VaccinationFormSuccess from './VaccinationFormSuccess'

import useAddVaccination from '../../../hooks/addvaccination'

export default function AddVaccination({ profileid, idToken }) {
  const { handleChange, handleSubmit, values } = useAddVaccination(
    profileid,
    idToken
  )

  return !values.submitMessage ? (
    <VaccinationForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      values={values}
    />
  ) : Array.isArray(values.submitMessage) ? (
    <VaccinationFormSuccess submitMessage={values.submitMessage} />
  ) : (
    <VaccinationFormFailure submitMessage={values.submitMessage} />
  )
}
