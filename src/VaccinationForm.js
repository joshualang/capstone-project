import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { patchData } from './services'

import info from './img/info.svg'
import vaccinationExample from './vaccinationExample.jpg'
import checkmark from './img/checkmark.svg'

import colors from './common/styles/colors'
import Title from './common/text/Title'
import DetailsText from './common/text/DetailsText'

import Head from './Head'

export default function() {
  function nowAsString() {
    function addLeadingZero(n) {
      return n < 10 ? '0' + n : n
    }
    const now = new Date()
    const date = now.getDate()
    const month = now.getMonth() + 1
    const year = now.getFullYear()
    return `${addLeadingZero(date)}.${addLeadingZero(month)}.${year}`
  }

  function isValidDate(date) {
    const matches = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(date)
    if (matches == null) return false
    const d = matches[1]
    const m = matches[2] - 1
    const y = matches[3]
    const composedDate = new Date(y, m, d)
    return (
      composedDate.getDate() == d &&
      composedDate.getMonth() == m &&
      composedDate.getFullYear() == y
    )
  }

  const [form, setForm] = useState({
    doctor: '',
    validDoctor: false,
    date: '',
    validDate: false,
    sticker: '',
    validSticker: false,
    userBirth: '24.09.2019',
    infoVisible: false,
  })

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
          <Input
            id="vaccinationDoctor"
            name="vaccinationDoctor"
            onInput={event =>
              setForm({
                ...form,
                doctor: event.target.value,
                validDoctor: event.target.value !== '',
              })
            }
            placeholder="Dr. med. Max Mustermann"
            type="text"
            valid={form.validDoctor}
          ></Input>
        </Flexbox>
        <Flexbox>
          <label htmlFor="vaccinationDate">
            <Title>Datum der Impfung</Title>
          </label>
          <Input
            id="vaccinationDate"
            name="vaccinationDate"
            onInput={event =>
              setForm({
                ...form,
                date: event.target.value,
                validDate: isValidDate(event.target.value),
              })
            }
            placeholder={nowAsString()}
            type="text"
            valid={form.validDate}
          ></Input>
        </Flexbox>
        <Flexbox>
          <Flexbox
            flexDirection="row"
            onClick={() => setForm({ ...form, infoVisible: !form.infoVisible })}
          >
            <label htmlFor="vaccinationSticker">
              <Title>Text auf den Aufklebern</Title>
            </label>
            <img className="icon" src={info} alt="further information"></img>
          </Flexbox>
          {form.infoVisible ? (
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
          <Input
            id="vaccinationSticker"
            name="vaccinationSticker"
            onInput={event =>
              setForm({
                ...form,
                sticker: event.target.value,
                validSticker: event.target.value !== '',
              })
            }
            type="text"
            placeholder="Infanrix hexa A21CA404C"
            valid={form.validSticker}
          ></Input>
        </Flexbox>
        {form.validSticker && form.validDate && form.validDoctor ? (
          <SubmitButton isActive={true} type="submit">
            Submit{console.log('enabled')}
          </SubmitButton>
        ) : (
          <SubmitButton isActive={false} disabled>
            Submit{console.log('disabled')}
          </SubmitButton>
        )}
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
`
const Input = styled.input`
  font-family: Helvetica, sans-serif;
  font-weight: 300;
  font-size: 1rem;
  color: ${colors.grey};

  margin-left: 4px;
  width: 80%;
  border: none;
  border-bottom: 2px solid ${props => (props.valid ? 'green' : colors.greySemi)};
  ::placeholder {
    color: ${colors.grey};
  }
`

const Flexbox = styled.div`
  display: flex;
  flex-direction: ${props => props.flexDirection || 'column'};
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
const SubmitButton = styled.button`
  align-self: flex-start;
  border-radius: 16px;
  border: 2px solid blue;
  width: 80px;
  height: 32px;
  background: ${props => (props.isActive ? 'blue' : 'white')};
  color: ${props => (props.isActive ? 'white' : 'blue')};
`
