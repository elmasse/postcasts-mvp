import React from 'react'
import styled, { css, keyframes } from 'react-emotion'

import Logo from './logo'


export default ({ onNavHome}) => (
  <Nav>
    <Title onClick={() => onNavHome()}><Logo css={spinned} fill="#f1f1f1" height="42" width="42" style={{paddingRight: 5}}/>Postcast</Title>
  </Nav>
)

const popFrames = keyframes`
  30% { transform: scale(.6); }
  60% { transform: scale(1.25); }  
`


const Nav = styled.nav`
  display: flex;
  border-bottom: 1px solid #424242;
  padding: 20px 10px;
  background: #000;
`

const spinned = css`
  animation: ${popFrames} 1s ease-in-out;
`

const Title = styled.a`
  text-decoration: none;
  color: #f1f1f1;
  font-family: 'Unica One';
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`
