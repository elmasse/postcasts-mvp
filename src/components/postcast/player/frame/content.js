import React, { Component } from 'react'
import { css } from 'react-emotion'

export default class Content extends Component {
  static displayName = 'Content'
  
  render () {
    const { children } = this.props
    return (
      <div css={scrollable}>{children}</div>
    )
  }
}

const scrollable = css`
  margin: auto;
  padding: 30px;
`
