import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import styled from 'react-emotion'

//move this

const isStringNode = node => (typeof node === 'string')

const isCodeNode = node => node.type.displayName === 'Code'
const isCaptionNode = node => node.type.displayName === 'Caption'
const isContentNode = node => node.type.displayName === 'Content'

const processTextToSpeech = (children) => {

  const sanitize = textNode => {
    return textNode
      .replace(/[·]/gi, '') //hmmmm....
      .replace(/http(s):\/\//, '')
  }

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
      duration: props.duration || 2000,
      textToSpeech: processTextToSpeech(props.children)
    }

  }

  play = () => {
    const { done } = this.props
    const { duration, textToSpeech } = this.state
    const lang  = 'en-US'

    this._running = undefined

    if (textToSpeech) {
      
      const utterance = new SpeechSynthesisUtterance(textToSpeech)
      // utterance.rate = 0.9
      // utterance.pitch = 0.75
      utterance.voice = synth.getVoices().filter(l => l.lang === lang)[0]

      utterance.onerror = (...errors) => {
        console.log(errors)
      }

      utterance.onend = () => {
        if (this._cancelled) {
          this._cancelled = false
          return
        }

        const { playing } = this.props
        if (playing) done()
      }

      if (synth.paused) synth.resume()
      synth.cancel()
      synth.speak(utterance)

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
    
    if (playing && !synth.paused && !synth.speaking) this.play()

    if (playing && synth.paused) synth.resume()
    
    if (!playing && synth.speaking) synth.pause()

  }

  resetAnchorTarget = () => {
    const root = findDOMNode(this)
    if (root && root.querySelectorAll) {
      root.querySelectorAll('a[href^="http://"], a[href^="https://"]').forEach(tag => { 
        tag.target = '_blank'
        tag.rel='noopener noreferrer'
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { children } = nextProps    
    if ( children !== this.props.children ) {
      this.stop()
      // TODO: check this...
      this.setState({
        textToSpeech: processTextToSpeech(children)  // Hmmmm      
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { playing, captions } = this.props
    return nextState !== this.state
      || nextProps.captions !== captions
      || nextProps.playing !== playing
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
    this.shouldStartPlaying()
  }

  componentWillUnmount() {
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
  overflow: scroll;

  & > div {
    margin: auto;
    padding: 30px;
  }
`
