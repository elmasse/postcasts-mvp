import React, { Component } from 'react'
import styled from 'react-emotion'

import LoadForm from '../components/load-form'
import Settings from '../components/settings'
import Postcast from 'postcast'

const decode = (encoded) => atob(encoded)
const b64DecodeUnicode = (str) => {
  return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))
}


export default class Play extends Component {

  constructor(props){
    super(props)
    const { match } = props
    this.state = {
      src: match ? decode(match.params.encoded || '') : '',
      ...(match && match.params.settings ? JSON.parse(b64DecodeUnicode(match.params.settings)) : {})
    }
  }

  componentWillReceiveProps({ match }) {
    const { match: prevMatch } = this.props
    if ( match !== prevMatch ) {
      this.setState({
        src: match ? decode(match.params.encoded || '') : '',
        ...(match && match.params.settings ? JSON.parse(b64DecodeUnicode(match.params.settings)) : {})
      })
    }
  }

  reloadWithSettings = (settings) => {
    const { onSourceSelection } = this.props
    const { src } = this.state
    onSourceSelection({ src, settings })
  }
  
  render() {
    const { src, language, phonemes } = this.state
    const { onSourceSelection, file } = this.props
    const hasSrc = (src || file) 

    return (
      <Main hasSrc={hasSrc}>
        <LoadForm onSelected={onSourceSelection} src={src} file={file}/>
        <Section>
          <Postcast
            key={`postcast-${language}`}
            src={src}
            file={file}
            lang={language}
            phonemes={phonemes}
          />
        </Section>
        <Section alignSelf="stretch">
          <Settings onSave={this.reloadWithSettings} language={language} phonemes={phonemes}/>
        </Section>
      </Main>
    )
  }
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({hasSrc}) => hasSrc ? '0 50px 0px': '50px 50px 0' };
  transition: all .3s ease;
`

const Section = styled.div`
  padding: 30px 0;
  ${( { alignSelf } ) => `align-self: ${alignSelf}`}
`