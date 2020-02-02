import React, { useRef } from 'react'
import styled from 'styled-components/macro'
import Head from '../Head'

import { Link } from 'react-router-dom'
import checkmark from '../../../img/checkmark.svg'
import PersonalInformation from './PersonalInformation'
import DiseasesSelected from './DiseasesSelected'

import { isValidDate } from '../../../helper/dateHelper'
import useSettings from '../../../hooks/settings'

export default function({ profileid, idToken, userBirth, userName, settings }) {
  const refSubmit = useRef(null)
  const { handleChange, handleSubmit, values } = useSettings(
    profileid,
    idToken,
    userBirth,
    userName,
    settings
  )

  return (
    <>
      <Head
        headline="Einstellungen"
        topRight={
          <Link to="/" onClick={() => refSubmit.current.click()}>
            <img height="18px" width="18px" src={checkmark} alt="submit" />
          </Link>
        }
      />
      <Container>
        <Settings onSubmit={handleSubmit} onChange={handleChange}>
          <div>
            <PersonalInformation
              values={values}
              isValidDate={isValidDate}
            ></PersonalInformation>
          </div>
          <div>
            <DiseasesSelected values={values}></DiseasesSelected>
          </div>
          <button
            ref={refSubmit}
            type="submit"
            style={{ display: 'none' }}
          ></button>
        </Settings>
      </Container>
    </>
  )
}

const Settings = styled.form`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-right: 4px;
`
const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
`
