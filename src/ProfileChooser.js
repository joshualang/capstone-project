import React, { useState, useRef } from 'react'
import styled from 'styled-components/macro'
import useHeight from './hooks/useHeight'
import SectionText from './common/text/SectionText'

export default function ProfileChooser({
  refresh,
  currentProfile,
  changeProfile,
}) {
  const [isProfileChooserOpen, setIsProfileChooserOpen] = useState(false)

  const profilesEl = useRef()
  const maxHeight = useHeight(profilesEl)
  function onUserClick() {
    setIsProfileChooserOpen(!isProfileChooserOpen)
    console.log('user clicked', isProfileChooserOpen)
  }
  return (
    <div>
      <User onClick={() => onUserClick()}>
        <Profiles
          ref={profilesEl}
          active={isProfileChooserOpen}
          maxHeight={maxHeight}
        >
          {currentProfile.map((item, index) => (
            <SectionText
              onClick={() => changeProfile(index)}
              style={{ marginBottom: '8px' }}
            >
              <a>{item}</a>
            </SectionText>
          ))}
        </Profiles>
        <div
          className={isProfileChooserOpen ? 'arrow-down active' : 'arrow-down'}
        />
      </User>
    </div>
  )
}

const User = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .arrow-down {
    width: 20px;
    height: 20px;
    position: relative;
  }
  .arrow-down.active {
    margin-bottom: 8px;
  }

  .arrow-down:before,
  .arrow-down:after {
    content: '';
    display: block;
    width: 10px;
    height: 3px;
    background: black;
    position: absolute;
    top: 10px;
    transition: transform 0.5s;
  }

  .arrow-down:before {
    right: 5px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    transform: rotate(45deg);
  }

  .arrow-down:after {
    right: 0px;
    transform: rotate(-45deg);
  }

  .arrow-down.active:before {
    transform: rotate(-45deg);
  }

  .arrow-down.active:after {
    transform: rotate(45deg);
  }
`
const Profiles = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: height 0.3s ease-in-out;
  height: ${props => (props.active ? props.maxHeight + 'px' : '21px')};
`
