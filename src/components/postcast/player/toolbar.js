import React from 'react'
import styled from 'react-emotion'

import Timeline from './timeline'

export default ({ open, onPlay, onPause, onStop, playing, frames, active, onChangeFrame, ...props }) => {
  const playPauseText = !playing ? 'Play' : 'Pause'
  const playPauseAction = !playing ? onPlay : onPause

  return (
    <Toolbar {...props}>
      <button onClick={()=> playPauseAction() } >{playPauseText}</button>
      <button onClick={()=> onStop() } >Stop</button>
      <button >&lt;</button>
      <button >&gt;</button>
      <Timeline active={active} frames={frames} onChangeFrame={onChangeFrame} />
    </Toolbar>
  )
}

const Toolbar = styled('div')`
  position: absolute;
  height: 30px;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,.7);
  display: flex;
`