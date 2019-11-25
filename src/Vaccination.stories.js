import React from "react"

import Vaccination from "./Vaccination"

export default {
  title: "Vaccination"
}

export const text = () => (
  <Vaccination
    vaccination="Gelbsucht"
    date="11 dec, 2014"
    doctor="Dr. med. Max Mustermann"
  ></Vaccination>
)
