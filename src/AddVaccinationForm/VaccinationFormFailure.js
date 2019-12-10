import React from 'react'
import styled from 'styled-components/macro'

import Title from '../common/text/Title'
import Head from '../Head'
import error from '../img/error.svg'

export default function VaccinationFormFailure({
  submitMessage,
  setFormSubmitBack,
}) {
  return (
    <>
      <Head
        headline="Hinzufügen Fehlgeschlagen"
        onTopLeftClick={() => setFormSubmitBack()}
      />
      <Feedback>
        <img src={error} alt="" height="100px" width="100px"></img>
        <Title style={{ textAlign: 'center' }}>{submitMessage}</Title>
      </Feedback>
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
