import React, { Component } from 'react'
import styled from 'react-emotion'

export default class Captions extends Component {


  render () {
    const { captions, onToggle, size = 48, ...props } = this.props
    const fill = captions ? '#000' : '#ccc'
    return (
      <svg onClick={onToggle} height={size} width={size} fill={fill} {...props} viewBox="0 0 48 48"  xmlns="http://www.w3.org/2000/svg">
        <path d="M38 8H10c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4zM22 22h-3v-1h-4v6h4v-1h3v2c0 1.1-.89 2-2 2h-6c-1.11 0-2-.9-2-2v-8c0-1.1.89-2 2-2h6c1.11 0 2 .9 2 2v2zm14 0h-3v-1h-4v6h4v-1h3v2c0 1.1-.89 2-2 2h-6c-1.11 0-2-.9-2-2v-8c0-1.1.89-2 2-2h6c1.11 0 2 .9 2 2v2z"/>
      </svg>
    )

  }
}
