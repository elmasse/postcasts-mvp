import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import ga from './analytics'

import Home from './routes/home'
import Play from './routes/play'

export default class App extends Component {
  
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/play/:encoded" component={Play} />
          {/* <Route exact
            path="/play/:encoded" 
            children={ (props) => {
              return (<Play {...props} />)
            } }
          /> */}
      </div>      
    </Router>
    )
  }

  componentDidMount () {
    ga.send('pageview')
  }
}

