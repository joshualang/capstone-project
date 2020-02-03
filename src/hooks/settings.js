import { useState } from 'react'
import { stringifyDate } from '../helper/dateHelper'
import { updateSettingsProfile } from '../helper/services'

export default function useSettings(
  profileid,
  idToken,
  userBirth,
  userName,
  settings
) {
  const [values, setValues] = useState({
    name: userName,
    birth: stringifyDate(new Date(userBirth)),
    settings: { ...settings },
  })

  const handleSubmit = event => {
    event.preventDefault()
    updateSettingsProfile(
      profileid,
      idToken,
      values.name,
      values.birth,
      values.settings
    )
  }

  const handleChange = event => {
    event.persist()
    const target = event.target
    const name = target.name
    if (target.type === 'checkbox') {
      const value = target.checked

      setValues(values => ({
        ...values,
        settings: {
          ...values.settings,
          [name]: value,
        },
      }))
    } else {
      const value = target.value

      setValues(values => ({
        ...values,
        [name]: value,
      }))
    }
  }

  return {
    handleChange,
    handleSubmit,
    values,
  }
}
