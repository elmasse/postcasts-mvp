import React, { Component } from 'react'
import styled from 'react-emotion'

const textToSpeech = (comp) => {

  const isStringNode = (node) => (typeof node === 'string')

  const walk = (c) => {
    const { children = [] } = c.props
    return children
      .filter((child, _, all) => { 
        return ( isStringNode(child) || !(child.type.name === 'Content' && all.length > 1))
      })
      .map((child) => isStringNode(child) ? (child) : (child.type.name !== 'Code') ? walk(child) : '')
      .reduce((prev, curr) => prev.concat(curr) , [])
      .join(' ')
  }

  return walk(comp)
}

const synth = window.speechSynthesis

export default class Frame extends Component {

  _cancelled = false
  _running = undefined

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
    
    this._running = undefined

    if (textToSpeech) {
      this.utterance = new SpeechSynthesisUtterance(textToSpeech)
      this.utterance.rate = 0.9
      this.utterance.pitch = 0.75
      
      this.utterance.onerror = (...errors) => {
        console.log(errors)
      }
      
      this.utterance.onend = () => {
        if (this._cancelled) {
          this._cancelled = false
          return
        }

        const { playing } = this.props
        console.log('speak end', textToSpeech, this.props.playing)
        if (playing) done()
      }
      synth.speak(this.utterance)
    } else {
      this._running = window.setTimeout(( ) => {
        const { playing } = this.props
        console.log('timeout end', playing)
        if (playing) done()
      }, duration)
    }

  }

  stop = () => {
    if (synth.speaking) {
      this._cancelled = true
      synth.cancel()
    }
    if (this._running) {
      window.clearTimeout(this._running)
    }
  }

  shouldStartPlaying() {
    const { playing } = this.props
    
    if (playing && !synth.paused) this.play()

    if (playing && synth.paused) synth.resume()
    
    if (!playing && synth.speaking) synth.pause()

  }

  componentWillReceiveProps({ children }) {
    // TODO: check this...
    if ( children ) {
      this.stop()

      this.setState({
        textToSpeech: textToSpeech({...this, props: { children }})  // Hmmmm      
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
