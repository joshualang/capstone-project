import React from 'react'
import VaccinationForm from './VaccinationForm'
import VaccinationFormFailure from './VaccinationFormFailure'
import VaccinationFormSuccess from './VaccinationFormSuccess'

export default function AddVaccination({
  form,
  data,
  onFormSubmit,
  onFormInfoVisibleChange,
  onFormDoctorChange,
  onFormDateChange,
  onFormStickerChange,
  setFormSubmitBack,
  addVaccination,
}) {
  return !form.isSubmitted ? (
    <VaccinationForm
      form={form}
      data={data}
      onFormSubmit={onFormSubmit}
      onFormInfoVisibleChange={onFormInfoVisibleChange}
      onFormDoctorChange={onFormDoctorChange}
      onFormDateChange={onFormDateChange}
      onFormStickerChange={onFormStickerChange}
      addVaccination={addVaccination}
    />
  ) : Array.isArray(form.isSubmitted) ? (
    <VaccinationFormSuccess
      setFormSubmitBack={setFormSubmitBack}
      submitMessage={form.isSubmitted}
    />
  ) : (
    <VaccinationFormFailure
      setFormSubmitBack={setFormSubmitBack}
      submitMessage={form.isSubmitted}
    />
  )
}
