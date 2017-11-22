import React, { Component } from 'react'
import styled from 'react-emotion'

import process from './processor'
import Toolbar from './toolbar'
import Timeline from './timeline'



export default class Player extends Component {

  constructor(props) {
    super(props)
    const { markdown } = props

    this.state = {
      active: 0,
      playing: false,
      frames: process(markdown),
      captions: true
    }
  }
  
  handlePlay = () => {
    this.setState({
      playing: true
    })
  }

  next = () => {
    const { active, frames } = this.state
    const next = active + 1
    
    if (next >= frames.length) {

      this.setState({
        playing: false
      })
    } else {
      this.setState({active: next})      
    }
  }

  handlePause = () => {
    this.setState({
      playing: false
    })
  }

  handleStop = () => {
    this.setState({
      playing: false,
      active: 0
    })
  }

  handleFrameChange = (value) => {
    this.setState({ active: value })
  }

  handleToggleCaptions = () => {
    this.setState(prevState => ({ captions: !prevState.captions }) )
  }

  render() {
    const { frames, active, playing, captions } = this.state    
    const frame = {...frames[active]}
    const { type: Frame } = frame

    return (
      <Container>
        <Viewport>
          <Frame {...frame.props} done={this.next} {...{ captions, playing }}/>
        </Viewport>
        <Toolbar
          onPlay={this.handlePlay}
          onPause={this.handlePause}
          onStop={this.handleStop}
          playing={playing}
        >
          <Timeline active={active} frames={frames} onChangeFrame={this.handleFrameChange} />
          <button onClick={this.handleToggleCaptions}>Captions: {captions ? 'On' : 'Off'} </button>
        </Toolbar>
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  flex: 1;
`

const Viewport = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center; 
  flex: 1; 
`