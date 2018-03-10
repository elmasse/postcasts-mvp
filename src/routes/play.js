import React, { Component } from 'react'
import styled from 'react-emotion'

import LoadForm from '../components/load-form'
import Settings from '../components/settings'
import Postcast from 'postcast'

import { decode } from '../base64'

export default class Play extends Component {

  constructor(props){
    super(props)
    const { match } = props
    this.state = {
      src: match ? decode(match.params.encoded || '') : '',
      ...(match && match.params.settings ? JSON.parse(decode(match.params.settings)) : {})
    }
  }

  componentWillReceiveProps({ match }) {
    const { match: prevMatch } = this.props
    if ( match !== prevMatch ) {
      this.setState({
        src: match ? decode(match.params.encoded || '') : '',
        ...(match && match.params.settings ? JSON.parse(decode(match.params.settings)) : {})
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
        <Section>
          <Postcast
            key={`postcast-${language}`}
            src={src}
            file={file}
            lang={language}
            phonemes={phonemes}
          />
        </Section>
        <Section>
          <LoadForm onSelected={onSourceSelection} src={src} file={file}/>
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
  max-width: 900px;
  padding: 30px 0;
`