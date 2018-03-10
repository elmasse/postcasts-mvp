import React, { Component } from 'react'
import { Router, Route } from 'react-router-dom'
import createBrowserHistory from "history/createBrowserHistory"
// eslint-disable-next-line 
import css from 'highlight.js/styles/atom-one-light.css'

import ga from './analytics'

import Navigation from './components/navigation'
import Footer from './components/footer'

import Home from './routes/home'
import Play from './routes/play'

const history = createBrowserHistory()
const encode = (url) => btoa(url)
const b64EncodeUnicode = (str) => {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
      return String.fromCharCode(parseInt(p1, 16))
  }))
}

export default class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      file: null
    }
  }

  handleHomeNav = () => {
    history.push(`/`)
  }

  handleSourceSelection = ({ src = '', file = null, settings }) => {
    this.setState(() => {
      if (src) {
        ga.send('event', { ec: 'load-src', ea: src })
        history.push(`/play/${encode(src)}${settings ? `/${b64EncodeUnicode(JSON.stringify(settings))}` : ''}`)  
      }
  
      if (file) {
        ga.send('event', { ec: 'load-file', ea: file.name })
        history.push(`/play/`)
      }

      return {
        file
      }
    })
  }

  render() {
    const { file } = this.state
 
    return (
      <div>
        <Navigation onNavHome={this.handleHomeNav}/>
        <Router history={history}>
          <div>
            <Route exact              
              path="/"
              render={ (props) => <Home onSourceSelection={this.handleSourceSelection} {...props}/> }
            />
            <Route 
              path="/play/:encoded?/:settings?" 
              render={ (props) => <Play onSourceSelection={this.handleSourceSelection} file={file} {...props}/> }
            />
          </div>      
      </Router>
      <Footer/>
    </div>
    )
  }

  componentDidMount () {
    ga.send('pageview')
  }
}

