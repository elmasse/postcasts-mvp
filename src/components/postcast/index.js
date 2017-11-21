import React, { Component } from 'react'
import styled from 'react-emotion'

import Player from './player'

export default class PostCast extends Component  {
  
  constructor(props){
    super(props)
    this.state = { 
      loaded: false,
      loading: false
    }
  }

  async componentDidMount () {
    const { src } = this.props
    await this.fetchPost(src)
  }

   async componentDidUpdate(prevProps) {
    const { src } = this.props
    const { src: prevSrc } = prevProps
    if (prevSrc !== src) {
        await this.fetchPost(src)
    }
  }

  async fetchPost(src) {
    if (!src) return //TODO clean state

    this.setState({ loading: true })
    const response = await fetch(src)

    console.log(response.headers.get("content-type"))
    
    if (!(response.headers.get("content-type").includes(`text/markdown`) ||
      response.headers.get("content-type").includes(`text/plain`))) {
      throw new Error(`${src} is not a markdown file`)
    }

    const text = await response.text()

    this.setState({
      loaded: true,
      loading: false,
      markdown: text
    })

  } 

  render () {
    const { src, ...props } = this.props
    const { loaded, loading, markdown } = this.state

    return (
      <Container {...props} >
        { loading && <Loading>Loading</Loading> }
        { !loading && loaded && <Player markdown={markdown}></Player> }
      </Container>
    )
  }
}

const Container = styled('div') `
  height: 500px;
  width: 900px;
  background: #181818;
  position: relative;
  display: flex;
  overflow: hidden;

  > div {
    flex: 1;
  }
`

const Loading = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;  
`

