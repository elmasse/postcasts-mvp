import React from 'react'
import ReactDOM from 'react-dom'
import { injectGlobal } from 'react-emotion'

import App from './app'

// eslint-disable-next-line
injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: Lato, sans-serif;
    color: #f1f1f1;
    background: #31303a;
  }
`

ReactDOM.render(<App />, document.getElementById('root'))

