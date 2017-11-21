import React from 'react'
import styled from 'react-emotion'

import Logo from './logo'


export default () => (
  <Nav>
    <Title><Logo fill="#f1f1f1" height="42" width="42" style={{paddingRight: 5}}/>Postcast</Title>
  </Nav>
)

const Nav = styled.nav`
  display: flex;
  border-bottom: 1px solid #424242;
  padding: 20px 10px;
  background: #000;
`

const Title = styled.div`
font-family: Lato;
font-size: 24px;
display: flex;
align-items: center;
justify-content: center;
`
