import React from 'react'
import styled from 'styled-components/macro'
import Title from './common/text/Title'

export default function ToggleSwitchInput({
  children,
  value,
  onChange = () => {},
  disease,
}) {
  return (
    <Switch>
      <label htmlFor={children}>
        <Title>{children}</Title>
      </label>
      <Background active={value[disease]} className="switch">
        <input
          id={children}
          type="checkbox"
          onChange={event => onChange(disease, event)}
          checked={value[disease]}
        />
        <div></div>
      </Background>
    </Switch>
  )
}

const Switch = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px 0;

  .switch input {
    position: absolute;
    opacity: 0;
  }
  .switch div {
    height: 1em;
    width: 1em;
    border-radius: 1em;
    background: #fff;
    box-shadow: 0 0.1em 0.3em rgba(0, 0, 0, 0.3);
    transition: all 200ms;
  }

  .switch input:checked + div {
    transform: translate3d(100%, 0, 0);
  }
`

const Background = styled.label`
  display: inline-block;
  font-size: 1em; /* 1 */
  height: 1em;
  width: 2em;
  background: ${props => (props.active ? 'green' : 'red')};
  border-radius: 1em;
`
