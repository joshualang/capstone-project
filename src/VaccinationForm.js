import React, { useState } from "react"
import styled from "styled-components/macro"
import colors from "./common/styles/colors"
import Title from "./common/text/Title"
import Text from "./common/text/Text"
import DetailsText from "./common/text/DetailsText"
import Head from "./Head"
import info from "./img/info.svg"
import checkmark from "./img/checkmark.svg"
import vaccinationExample from "./vaccinationExample.jpg"
import { Link } from "react-router-dom"

export default function() {
  const now = new Date()
  const date = now.getDate()
  const month = now.getMonth() + 1
  const year = now.getFullYear()
  const dateString = `${date}.${month}.${year}`

  function dateValidation() {
    //regEx
  }

  const [form, setForm] = useState({ doctor: "", date: "", sticker: "" })
  const [infoVisible, setInfoVisible] = useState(false)
  console.log(form)
  return (
    <>
      <Head
        onBackClick={null}
        topRight={
          <Link to="/home">
            <img src={checkmark} />
          </Link>
        }
      >
        Füge eine Impfung hinzu
      </Head>
      <Form>
        <Flexbox>
          <label htmlFor="vaccinationDate">
            <Title>Name des Arztes</Title>
          </label>
          <input
            onInput={event => setForm({ ...form, doctor: event.target.value })}
            type="text"
            id="vaccinationDoctor"
            name="vaccinationDoctor"
            placeholder="Dr. med. Max Mustermann"
          ></input>
        </Flexbox>
        <Flexbox>
          <label htmlFor="vaccinationDate">
            <Title>Datum der Impfung</Title>
          </label>
          <input
            onInput={event => setForm({ ...form, date: event.target.value })}
            placeholder={dateString}
          ></input>
        </Flexbox>
        <Flexbox>
          <Flexbox
            flexDirection="row"
            onClick={() => setInfoVisible(!infoVisible)}
          >
            <label htmlFor="vaccinationDate">
              <Title>Text auf den Aufklebern</Title>
            </label>
            <img className="icon" src={info}></img>
          </Flexbox>
          {infoVisible ? (
            <>
              <DetailsText>
                Bitte geben Sie alle Informationen der Aufkleber
                leerzeichengetrennt an.
                <br />
                Zum Beispiel:
              </DetailsText>
              <img src={vaccinationExample}></img>
              <DetailsText>Prevenar 32323 P661966</DetailsText>
            </>
          ) : (
            <></>
          )}
          <input
            onInput={event => setForm({ ...form, sticker: event.target.value })}
            type="text"
            placeholder="Infanrix hexa A21CA404C"
          ></input>
        </Flexbox>
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
    border-bottom: 1px solid ${colors.greySemi};
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
