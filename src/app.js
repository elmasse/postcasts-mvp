import React, { Component } from 'react'
import styled from 'react-emotion'

import ga from './analytics'

import Navigation from './components/navigation'
import PostCast from './components/postcast'
import LoadForm from './components/load-form'
import ErrorModal from './components/error-modal'

export default class App extends Component {
  
  constructor(props){
    super(props)
    this.state =  {
      src: undefined,
      error: null,
      errorInfo: null
    }
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo)
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  handleSourceSelection = (src) => {
    ga.send('event', { ec: 'load', ea: src })
    this.setState({
      error: false,
      src
    })
  }

  render() {
    const { src, error } = this.state

    return (
      <Wrapper>
        {error && <ErrorModal>Error Ocurred</ErrorModal> }
        <Navigation />
        <div className="App-header">
          <LoadForm onSelected={this.handleSourceSelection}/>
          {/* <span>Or try these README.md from github</span>
          <ReactIcon onClick={this.loadReact} height="40" width="40" />
          <ReduxIcon onClick={this.loadRedux} height="40" width="40" /> */}
        </div>
        {!error && <PostCast className="PostCast" src={src}/>}
      </Wrapper>
    )
  }

  componentDidMount () {
    ga.send('pageview')
  }
}


const Wrapper = styled.div`
  text-align: center;
  & .App-header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  & .PostCast {
    margin: 20px auto;
  }
`
