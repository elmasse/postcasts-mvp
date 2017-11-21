import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'react-emotion';
import App from './app';
import registerServiceWorker from './registerServiceWorker';

// eslint-disable-next-line
injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: Lato, sans-serif;
    color: #f1f1f1;
    background: #222;
  }
`;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
