import React from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components/macro'
import { patchData } from '../services'

import info from '../img/info.svg'
import vaccinationExample from '../img/vaccinationExample.jpg'

import colors from '../common/styles/colors'
import Title from '../common/text/Title'
import DetailsText from '../common/text/DetailsText'

import Head from '../Head'

export default function({
  form,
  onFormSubmit,
  onFormInfoVisibleChange,
  onFormDoctorChange,
  onFormDateChange,
  onFormStickerChange,
}) {
  return (
    <>
      <Head headline="Impfung hinzufügen" />
      <Form
        onSubmit={event => {
          event.preventDefault()
          patchData(form).then(res => {
            onFormSubmit(res)
          })
        }}
      >
        <Flexbox>
          <label htmlFor="vaccinationDoctor">
            <Title>Name des Arztes</Title>
          </label>
          <Input
            id="vaccinationDoctor"
            name="vaccinationDoctor"
            onInput={event => onFormDoctorChange(event)}
            placeholder="Dr. med. Max Mustermann"
            type="text"
            value={form.doctor}
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
            onInput={event => onFormDateChange(event)}
            placeholder="DD.MM.YYYY"
            value={form.date}
            type="text"
            valid={form.validDate}
          ></Input>
        </Flexbox>
        <Flexbox>
          <Flexbox
            flexDirection="row"
            onClick={() => onFormInfoVisibleChange()}
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
            onInput={event => onFormStickerChange(event)}
            type="text"
            placeholder="Infanrix hexa A21CA404C"
            value={form.sticker}
            valid={form.validSticker}
          ></Input>
        </Flexbox>
        {form.validSticker && form.validDate && form.validDoctor ? (
          <SubmitButton isActive={true} type="submit">
            Submit
          </SubmitButton>
        ) : (
          <SubmitButton isActive={false} disabled>
            Submit
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
