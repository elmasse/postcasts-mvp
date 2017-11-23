import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import ga from './analytics'

import Home from './routes/home'

export default class App extends Component {
  
  render() {
    return (
      <Router>
        <div>
          <Route 
            path="/play/:encoded" 
            children={ (props) => {
              return (<Home {...props} />)
            } }
          />
      </div>
    </Router>
    )
  }

  componentDidMount () {
    ga.send('pageview')
  }
}

