import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import styled from 'react-emotion'

//move this

const isStringNode = node => (typeof node === 'string')

const isCodeNode = node => node.type.name === 'Code'
const isCaptionNode = node => node.type.name === 'Caption'
const isContentNode = node => node.type.name === 'Content'

const processTextToSpeech = (children) => {

  const sanitize = textNode => textNode.replace(/[·]/gi, '') //hmmmm....

  const walk = (c) => {
    const { children = [] } = c.props
    return children
      .filter((child, _, all) => { 
        return ( isStringNode(child) || !(isContentNode(child) && all.length > 1))
      })
      .map((child) => isStringNode(child) ? (sanitize(child)) : (!isCodeNode(child)) ? walk(child) : '')
      .reduce((prev, curr) => prev.concat(curr) , [])
      .join(' ')
  }

  return walk({ props: { children } })
}

const synth = window.speechSynthesis

export default class Frame extends Component {

  _cancelled = false
  _running = undefined

  constructor(props) {
    super(props)
    
    this.state = {
      duration: props.duration || 1000,
      textToSpeech: processTextToSpeech(props.children)
    }

    this.shouldStartPlaying()

  }

  play = () => {
    const { done } = this.props
    const { duration, textToSpeech } = this.state
    const lang  = 'en-US'

    this._running = undefined

    if (textToSpeech) {
      this.utterance = new SpeechSynthesisUtterance(textToSpeech)
      this.utterance.rate = 0.9
      this.utterance.pitch = 0.75
      this.utterance.voice = synth.getVoices().filter(l => l.lang === lang)[0]
      
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
        console.log('timeout end', duration, playing)
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

  resetAnchorTarget = () => {
    const root = findDOMNode(this)
    if (root) {
      root.querySelectorAll('a[href^="http://"], a[href^="https://"]').forEach(tag => { 
        tag.target = '_blank'
        tag.rel='noopener noreferrer'
        console.log(tag.href)
      })
    }
  }

  componentWillReceiveProps({ children }) {    
    if ( children !== this.props.children ) {
      this.stop()
      // TODO: check this...
      this.setState({
        textToSpeech: processTextToSpeech(children)  // Hmmmm      
      })
    }
  }

  render() {
    const { children, captions, ...props } = this.props
    return (
      <Framed {...props}>
        {children.filter( c => captions || (!isCaptionNode(c)) )}
      </Framed>
    )
  }

  componentDidUpdate() {
    this.resetAnchorTarget()
    this.shouldStartPlaying()
    
  }

  componentDidMount() {
    this.resetAnchorTarget()
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
