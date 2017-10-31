import React, { Component } from 'react'
import Highlight from './code-highlight'

export default class Code extends Component {
  render() {
    const { className = "", children } = this.props
    const [, lang] = className.split('-')
    //   if (lang) {
    return (
      <pre className={`hljs hljs-${lang}`} style={{textAlign: 'left', minWidth: 450}}>
        <Highlight languages={['javascript', 'json', 'markdown', 'shell', 'yaml', 'xml']} className={className}>{children.join('')}</Highlight>
      </pre>
    )

  }
}
