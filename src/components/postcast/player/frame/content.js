import React, { Component } from 'react'

export default class Content extends Component {
  static displayName = 'Content'
  
  render () {
    const { children } = this.props
    return (
      <div>{children}</div>
    )
  }
}