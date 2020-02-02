import React from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

import VaccinationCard from '../VaccinationCard'
import Title from '../../common/text/Title'
import Head from '../Head'

import checkmark from '../../../img/checkmark.svg'
import success from '../../../img/success.svg'

export default function VaccinationFormSuccess({
  submitMessage,
  setFormSubmitBack,
}) {
  return (
    <>
      <Head
        headline="Impfung hinzugefügt"
        onTopLeftClick={() => setFormSubmitBack()}
        topRight={
          <Link to="/" onClick={() => setFormSubmitBack()}>
            <img height="18px" width="18px" src={checkmark} alt="submit" />
          </Link>
        }
      />
      <NewVaccinations>
        <Feedback>
          <img src={success} alt="" height="100px" width="100px"></img>
          <Title style={{ textAlign: 'center' }}>Erhaltene Impfungen</Title>
        </Feedback>
        {submitMessage.map(entry => (
          <VaccinationCard
            key={entry.id}
            vaccination={entry.disease}
            date={entry.date}
            doctor={entry.doctor}
            id={entry.id}
          ></VaccinationCard>
        ))}
      </NewVaccinations>
    </>
  )
}

const Feedback = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  align-items: center;
  gap: 16px;
`

const NewVaccinations = styled.div`
  overflow-y: scroll;
`
