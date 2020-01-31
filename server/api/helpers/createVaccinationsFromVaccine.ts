const mongoose = require('mongoose')
import getVaccinationType from './getVaccinationType'
import { dateStringToObject } from './timeHelper'

interface vaccinationMade {
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

export function createVaccinationsFromVaccine(
  date: string,
  birth: Date,
  doctor: string,
  diseases: string[],
  admittedApplicant: string,
  description: string,
  furtherInformation: string,
  name: string,
  registrationDate: Date,
  registrationNumber: string
): vaccinationMade[] {
  let vaccinations: vaccinationMade[] = []
  console.log(
    date,
    birth,
    doctor,
    diseases,
    admittedApplicant,
    description,
    furtherInformation,
    name,
    registrationDate,
    registrationNumber
  )
  diseases.forEach(disease => {
    vaccinations.push({
      date: dateStringToObject(date),
      doctor: doctor,
      disease: disease,
      admittedApplicant: admittedApplicant,
      description: description,
      furtherInformation: furtherInformation,
      name: name,
      registrationDate: registrationDate,
      registrationNumber: registrationNumber,
      _id: new mongoose.Types.ObjectId(),
      vaccinationType: getVaccinationType(birth, date, disease),
    })
  })
  return vaccinations
}
