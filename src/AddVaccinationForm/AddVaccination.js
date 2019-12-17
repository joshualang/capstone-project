import React from 'react'
import VaccinationForm from './VaccinationForm'
import VaccinationFormFailure from './VaccinationFormFailure'
import VaccinationFormSuccess from './VaccinationFormSuccess'

export default function AddVaccination({
  form,
  onFormSubmit,
  onFormInfoVisibleChange,
  onFormDoctorChange,
  onFormDateChange,
  onFormStickerChange,
  setFormSubmitBack,
  sendDataToBackend,
}) {
  return !form.isSubmitted ? (
    <VaccinationForm
      form={form}
      onFormSubmit={onFormSubmit}
      onFormInfoVisibleChange={onFormInfoVisibleChange}
      onFormDoctorChange={onFormDoctorChange}
      onFormDateChange={onFormDateChange}
      onFormStickerChange={onFormStickerChange}
      sendDataToBackend={sendDataToBackend}
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
