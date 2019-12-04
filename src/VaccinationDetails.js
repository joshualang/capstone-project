import React from "react"
import styled from "styled-components/macro"
import { useParams } from "react-router-dom"

import colors from "./common/styles/colors"
import Title from "./common/text/Title"
import Text from "./common/text/Text"
import Head from "./Head"

export default function VaccinationDetails({ data }) {
  let { id } = useParams()
  console.log("vaccinationDetails data", data, "id", id)
  const vaccination = { ...findVaccination(data), id: "" }

  function findVaccination(data) {
    return (
      data.vaccinationsMade.find(entry => entry.id === id) ||
      data.vaccinationsOpen.find(entry => entry.id === id)
    )
  }

  const keysToTitles = {
    date: "Datum",
    disease: "Krankheit",
    doctor: "Arzt",
    registrationNumber: "Zu­las­sungs­num­mer",
    vaccinationType: "Art der Impfung",
    admittedApplicant: "Zulassungsinhaber",
    description: "Stoff- oder In­di­ka­ti­onsgrup­pe",
    furtherInformation: "Weitere Informationen",
    name: "Bezeichnung",
    registrationDate: "Zulassungsdatum",
    begins: "Anfang des Impfungszeitraums",
    ends: "Ende des Impfungszeitraums",
    comment: "Kommentar",
    intervall: "Abstand zur letzten Impfung"
  }

  return (
    <>
      <Head headline={vaccination.disease}></Head>

      <VaccinationStyledOpen>
        {Object.keys(vaccination)
          .filter(entry => vaccination[entry] !== "")
          .map(entry => (
            <div key={entry}>
              <Title key={"Title" + entry}>{keysToTitles[entry]}</Title>
              <Text key={"Text" + entry}>{vaccination[entry]}</Text>
            </div>
          ))}
      </VaccinationStyledOpen>
    </>
  )
}

const VaccinationStyledOpen = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background: ${colors.white};
  box-shadow: none;
  margin: 0 8px;
  padding: 16px 8px;
  hyphens: none;
`
