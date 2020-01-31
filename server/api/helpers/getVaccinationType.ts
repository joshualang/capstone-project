const vaccinationRecommendations: vaccinationRecommendation[] = require('../../vaccinationRecommendations.json')
import { millisecondsToAgeInDays, dateStringToMilliseconds } from './timeHelper'

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

export default function(birth: Date, date: string, disease: string): string {
  let vaccinationType = 'Impfung nicht zuzuordnen'
  const userAgeInDays = millisecondsToAgeInDays(
    birth.getTime(),
    dateStringToMilliseconds(date)
  )

  const vaccinationRecommendation = vaccinationRecommendations.filter(
    recommendationsDisease => recommendationsDisease.disease === disease
  )[0]

  vaccinationRecommendation.recommendations.forEach(vaccination => {
    if (
      vaccination.beginsAtAgeInDays < userAgeInDays &&
      userAgeInDays < vaccination.endsAtAgeInDays
    ) {
      vaccinationType = vaccination.vaccinationType
    }
  })

  return vaccinationType
}
