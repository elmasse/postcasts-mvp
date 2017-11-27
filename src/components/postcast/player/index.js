import React, { Component } from 'react'
import styled from 'react-emotion'

import process from './processor'
import Play from './buttons/play'
import Timeline from './timeline'
import Captions from './buttons/captions'



export default class Player extends Component {

  constructor(props) {
    super(props)
    const { markdown } = props

    this.state = {
      active: 0,
      playing: false,
      frames: process(markdown),
      captions: true,
      mouseOver: false
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

  handleMouseEnter = () => {
    this.setState({mouseOver: true})
  }

  handleMouseLeave = () => {
    this.setState({mouseOver: false})
  }

  render() {
    const { frames, active, playing, captions, mouseOver } = this.state    
    const frame = {...frames[active]}
    const { type: Frame } = frame

    return (
      <Viewport onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        <Frame {...frame.props} done={this.next} {...{ captions, playing }}/>
        <Toolbar hide={playing && !mouseOver}>
          <Controls>
            <Play onPlay={this.handlePlay} onPause={this.handlePause} playing={playing} size={30}/>          
            <Captions onToggle={this.handleToggleCaptions} captions={captions} size={30}/>
          </Controls>
          <Timeline active={active} frames={frames} onChangeFrame={this.handleFrameChange} />          
        </Toolbar>
      </Viewport>
    )
  }

}

const Viewport = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center; 
  flex: 1; 
`

const Toolbar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: ${ ({ hide }) => hide ? 'none' : 'flex' };
  transition: all .3s ease-out;
`

const Controls = styled.div`
  display: flex;
  padding: 2px 5px;
`