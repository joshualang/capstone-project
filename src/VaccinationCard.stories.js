import React from "react"

import VaccinationCard from "./VaccinationCard"

export default {
  title: "VaccinationCard"
}

export const text = () => (
  <VaccinationCard
    vaccination="Gelbsucht"
    date="11 dec, 2014"
    doctor="Dr. med. Max Mustermann"
  ></VaccinationCard>
)
