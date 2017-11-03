import React, { Component } from 'react'
import styled from 'react-emotion'


const textToSpeech = (comp) => {

  const walk = (c) => {
    const { children = [] } = c.props
    return children
      .filter((e, idx, all ) => { 
        const isStringNode = (typeof e === 'string')
        
        return ( isStringNode || !(e.type.name === 'Content' && all.length > 1))
      })
      .map((e) => (typeof e === 'string') ? (e) : (e.type.name !== 'Code') ? walk(e) : '')
      .reduce((p, e) => p.concat(e) , [])
      .join(' ')
  }

  return walk(comp)
}

const synth = window.speechSynthesis

export default class Frame extends Component {

  constructor(props) {
    super(props)

    this.state = {
      duration: props.duration || 2500,
      textToSpeech: textToSpeech(this)
    }

    this.shouldStartPlaying()

  }

  play = () => {
    const { done } = this.props
    const { duration, textToSpeech } = this.state

    if (textToSpeech) {
      this.utterance = new SpeechSynthesisUtterance(textToSpeech)
      this.utterance.rate = 0.9
      this.utterance.pitch = 0.75
      
      this.utterance.onerror = (...errors) => {
        console.log(errors)
      }
      
      this.utterance.onend = () => {
        const { playing } = this.props
        console.log('speak end', textToSpeech, this.props.playing)
        if (playing) done()
      }
      synth.speak(this.utterance)
    } else {
      setTimeout(( ) => {
        const { playing } = this.props
        console.log('timeout end', playing)
        if (playing) done()
      }, duration)
    }

  }

  stop = () => {
    if (synth.speaking) {
      synth.cancel()
    }
  }

  shouldStartPlaying() {
    const { playing } = this.props
    
    if (playing && !synth.paused) this.play()

    if (playing && synth.paused) synth.resume()
    
    if (!playing && synth.speaking) synth.pause()

  }

  componentWillReceiveProps(nextProps) {
    // TODO: check this...
    if (nextProps.children) {
      this.setState({
        textToSpeech: textToSpeech({...this, props: { children: nextProps.children }})  // Hmmmm      
      })
    }
  }

  render() {
    const { children, ...props } = this.props
    return <Framed {...props}>{children}</Framed>
  }

  componentDidUpdate() {
    this.shouldStartPlaying()
  }

  componentWillUnmount() {
    this.utterance = null
    const { playing } = this.props
    
    if (playing) this.stop()
    
  }
}

const Framed = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  background: white;
  flex: 1;
`
