import React from 'react'
import styled from 'react-emotion'

import Logo from './logo'


export default () => {
  return (
    <Footer>
      <Left>
        <Brand>
          <Logo fill="#f1f1f1" height="42" width="42" style={{paddingRight: 5}}/>Postcast
        </Brand>
        <Copy> Max Fierro &copy; 2017 - { new Date().getFullYear() }</Copy>
      </Left>
    </Footer>
  )
}

const Footer = styled.footer`
  display: flex;
  align-items: self-start;
  padding: 10px 30px;
  min-height: 100px;
`

const Left = styled.div`

`

const Brand = styled.div`
  color: #f1f1f1;
  font-family: Lato;
  font-size: 22px;
  display: flex;
  align-items: center;
`

const Copy = styled.div`
  font-size: .7em;
  font-weight: 200;
  padding: 5px 0;
`