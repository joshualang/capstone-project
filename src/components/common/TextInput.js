import React from 'react'
import styled from 'styled-components/macro'
import Title from './text/Title'
import colors from './styles/colors'

export default function TextInput({
  children,
  value,
  name,
  valid,
  type = 'text',
}) {
  return (
    <Flexbox>
      <label>
        <Title>{children}</Title>
      </label>
      <Input type={type} name={name} defaultValue={value} valid={valid}></Input>
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
  :after {
    content: ''; /* This is necessary for the pseudo element to work. */
    display: block; /* This will put the pseudo element on its own line. */
    margin: 0 auto; /* This will center the border. */
    width: 50px; /* Change this to whatever width you want. */
    padding-top: 20px; /* This creates some space between the element and the border. */
    border-bottom: 5px solid red; /* This creates the border. Replace black with whatever color you want. */
  }
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
