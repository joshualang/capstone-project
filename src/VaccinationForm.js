import React, { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components/macro"
import { patchData } from "./services"

import info from "./img/info.svg"
import vaccinationExample from "./vaccinationExample.jpg"
import checkmark from "./img/checkmark.svg"

import colors from "./common/styles/colors"
import Title from "./common/text/Title"
import DetailsText from "./common/text/DetailsText"

import Head from "./Head"

export default function() {
  const now = new Date()
  const date = now.getDate()
  const month = now.getMonth() + 1
  const year = now.getFullYear()
  const dateString = `${date}.${month}.${year}`

  const [form, setForm] = useState({
    doctor: "",
    date: "",
    sticker: "",
    userBirth: "24.09.2019"
  })
  const [infoVisible, setInfoVisible] = useState(false)
  return (
    <>
      <Head
        headline="Impfung hinzufügen"
        topRight={
          <Link to="/home">
            <img src={checkmark} alt="submit" />
          </Link>
        }
      />
      <Form
        onSubmit={event => {
          event.preventDefault()
          console.log(form)
          patchData(form)
        }}
      >
        <Flexbox>
          <label htmlFor="vaccinationDoctor">
            <Title>Name des Arztes</Title>
          </label>
          <input
            id="vaccinationDoctor"
            name="vaccinationDoctor"
            onInput={event => setForm({ ...form, doctor: event.target.value })}
            placeholder="Dr. med. Max Mustermann"
            type="text"
          ></input>
        </Flexbox>
        <Flexbox>
          <label htmlFor="vaccinationDate">
            <Title>Datum der Impfung</Title>
          </label>
          <input
            id="vaccinationDate"
            name="vaccinationDate"
            onInput={event => setForm({ ...form, date: event.target.value })}
            placeholder={dateString}
            type="text"
            value={form.date}
          ></input>
        </Flexbox>
        <Flexbox>
          <Flexbox
            flexDirection="row"
            onClick={() => setInfoVisible(!infoVisible)}
          >
            <label htmlFor="vaccinationSticker">
              <Title>Text auf den Aufklebern</Title>
            </label>
            <img className="icon" src={info} alt="further information"></img>
          </Flexbox>
          {infoVisible ? (
            <>
              <DetailsText>
                Bitte geben Sie alle Informationen der Aufkleber
                leerzeichengetrennt an.
                <br />
                Zum Beispiel:
              </DetailsText>
              <img src={vaccinationExample} alt="vaccination sticker"></img>
              <DetailsText>Prevenar 32323 P661966</DetailsText>
            </>
          ) : (
            <></>
          )}
          <input
            id="vaccinationSticker"
            name="vaccinationSticker"
            onInput={event => setForm({ ...form, sticker: event.target.value })}
            type="text"
            placeholder="Infanrix hexa A21CA404C"
          ></input>
        </Flexbox>
        <button type="submit">Submit</button>
      </Form>
    </>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 24px;
  height: 100%;
  overflow-y: scroll;
  width: 100%;
  background: ${colors.white};
  box-shadow: none;
  margin: 16px 8px 0;
  padding: 0 8px;
  input {
    font-family: Helvetica, sans-serif;
    font-weight: 300;
    font-size: 1rem;
    color: ${colors.grey};

    margin-left: 4px;
    width: 80%;
    border: none;
    border-bottom: 1px solid
      ${props => (props.correct ? "green" : colors.greySemi)};
    ::placeholder {
      color: ${colors.grey};
    }
  }
`
const Flexbox = styled.div`
  display: flex;
  flex-direction: ${props => props.flexDirection || "column"};
  gap: 8px;
  align-items: top;
  img {
    width: 100%;
    border-radius: 4px;
  }
  .icon {
    width: 1rem;
    height: 1rem;
  }
`
