import React, { Component } from 'react';
import styled from 'react-emotion'

import Navigation from './components/navigation'
import PostCast from './components/postcast'
import LoadForm from './components/load-form'
import ErrorModal from './components/error-modal'

import ReactIcon from './components/icons/react'
import ReduxIcon from './components/icons/redux'

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
    this.setState({
      error: false,
      src
    })
  }

  loadReact = () => {
    this.handleSourceSelection('https://raw.githubusercontent.com/facebook/react/master/README.md')
  }

  loadRedux = () => {
    this.handleSourceSelection('https://raw.githubusercontent.com/reactjs/redux/master/README.md')
  }

  render() {
    const { src, error } = this.state

    return (
      <Wrapper>
        {error && <ErrorModal>Error Ocurred</ErrorModal> }
        <Navigation />
        <div className="App-header">
          <LoadForm onSelected={this.handleSourceSelection}/>
          <span>Or try these README.md from github</span>
          <ReactIcon onClick={this.loadReact} height="40" width="40"/>
          <ReduxIcon onClick={this.loadRedux} height="40" width="40" />
        </div>
        {!error && <PostCast className="PostCast" src={src}/>}
      </Wrapper>
    );
  }
}


const Wrapper = styled.div`
  text-align: center;
  & .App-header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;

    span {
      font-size: 14px;
      margin: 0 20px;
      font-weight: 100;
    }
  }

  & .PostCast {
    margin: 20px auto;
  }
`
