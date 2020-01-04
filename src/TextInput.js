import React from 'react'
import styled from 'styled-components/macro'
import Title from './common/text/Title'
import colors from './common/styles/colors'

export default function TextInput({ children, value, onChange, valid }) {
  return (
    <Flexbox>
      <label>
        <Title>{children}</Title>
      </label>
      <Input
        onChange={event => onChange(event)}
        value={value}
        valid={valid}
      ></Input>
    </Flexbox>
  )
}

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
  flex-direction: column;
  gap: 8px;
  align-items: top;
  margin: 8px 0;
`
