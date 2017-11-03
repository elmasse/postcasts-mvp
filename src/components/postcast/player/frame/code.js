import React, { Component } from 'react'
import Highlight from './code-highlight'
import styled from 'react-emotion'

export default class Code extends Component {
  render() {
    const { className = "", children } = this.props
    const [, lang] = className.split('-')
    //   if (lang) {
    return (
      <Pre className={`hljs hljs-${lang}`} style={{textAlign: 'left', minWidth: 450}}>
        <Highlight languages={['javascript', 'json', 'markdown', 'shell', 'yaml', 'xml']} className={className}>{children.join('')}</Highlight>
      </Pre>
    )

  }
}

const Pre = styled.pre`
  box-shadow: 0px 0 5px rgba(0,0,0,.15);
`