import React from 'react'
import styled from 'styled-components/macro'

import ToggleSwitchInput from '../../common/ToggleSwitchInput'
import DetailsText from '../../common/text/DetailsText'
import SectionText from '../../common/text/SectionText'

export default function DiseasesSelected({ values }) {
  return (
    <div>
      <SectionText>Abgedeckte Krankheiten</SectionText>
      <Indent>
        {Object.keys(values.settings).map(name => (
          <ToggleSwitchInput
            checked={values.settings[name]}
            name={name}
            key={name}
          >
            {name} <DetailsText>(empfohlen)</DetailsText>
          </ToggleSwitchInput>
        ))}
      </Indent>
    </div>
  )
}

const Indent = styled.div`
  padding-left: 8px;
`
