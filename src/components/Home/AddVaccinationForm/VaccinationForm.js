import React from 'react'
import styled from 'styled-components/macro'

import info from '../../../img/info.svg'
import vaccinationExample from '../../../img/vaccinationExample.jpg'

import colors from '../../common/styles/colors'
import Title from '../../common/text/Title'
import DetailsText from '../../common/text/DetailsText'

import Head from '../Head'
import SubmitButton from '../../common/SubmitButton'

import { isValidDate } from '../../../helper/dateHelper'

export default function({ handleChange, handleSubmit, values }) {
  return (
    <>
      <Head headline="Impfung hinzufügen" />
      <Form onSubmit={handleSubmit} onChange={handleChange}>
        <Flexbox>
          <label htmlFor="doctor">
            <Title>Name des Arztes</Title>
          </label>
          <Input
            id="doctor"
            name="doctor"
            placeholder="Dr. med. Max Musterarzt"
            type="text"
            valid={values.doctor}
          ></Input>
        </Flexbox>
        <Flexbox>
          <label htmlFor="date">
            <Title>Datum der Impfung</Title>
          </label>
          <Input
            id="date"
            name="date"
            placeholder="DD.MM.YYYY"
            defaultValue={values.date}
            type="text"
            valid={isValidDate(values.date)}
          ></Input>
        </Flexbox>
        <Flexbox>
          <label htmlFor="vaccine">
            <Title>Impfstoff</Title>
          </label>
          <Input
            id="vaccine"
            name="vaccine"
            type="text"
            placeholder="Hexyon"
            valid={values.vaccine}
          ></Input>
        </Flexbox>
        {values.vaccine && isValidDate(values.date) && values.doctor ? (
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
