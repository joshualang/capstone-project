const vaccinationRecommendations: vaccinationRecommendation[] = require('../../vaccinationRecommendations.json')
import { millisecondsToAgeInDays, ageInDaysToDateFromNow } from './timeHelper'
const mongoose = require('mongoose')

interface vaccinationRecommendation {
  disease: string
  recommendations: vaccination[]
}

interface vaccination {
  vaccinationType: string
  beginsAtAgeInDays: number
  endsAtAgeInDays: number
  mandatory: boolean
  intervall: number
  comment: string
}

interface vaccinationsMade {
  admittedApplicant: string
  date: Date
  description: string
  disease: string
  doctor: string
  furtherInformation: string
  _id: string
  name: string
  registrationDate: Date
  registrationNumber: string
  vaccinationType: string
}

interface vaccinationsOpen {
  begins: Date
  disease: string
  doctor: string
  _id: string
  vaccinationType: string
}

export function updateVaccinationsOpen(
  vaccinationsMade: vaccinationsMade[],
  birth: Date
) {
  let vaccinationsOpen: vaccinationsOpen[] = []

  vaccinationRecommendations.forEach(recommendationsDisease => {
    recommendationsDisease.recommendations.forEach(vaccination => {
      if (
        !vaccinationsMade.some(
          item => item.vaccinationType === vaccination.vaccinationType
        ) &&
        millisecondsToAgeInDays(birth.getTime()) + 30 >
          vaccination.beginsAtAgeInDays
      ) {
        vaccinationsOpen.push({
          begins: ageInDaysToDateFromNow(vaccination.beginsAtAgeInDays, birth),
          disease: recommendationsDisease.disease,
          doctor: 'Vereinbare einen Termin',
          _id: new mongoose.Types.ObjectId(),
          vaccinationType: vaccination.vaccinationType,
        })
      }
    })
  })

  return vaccinationsOpen
}
