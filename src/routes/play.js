import React, { Component } from 'react'
import styled from 'react-emotion'


import LoadForm from '../components/load-form'
import Postcast from '../components/postcast'

const decode = (encoded) => atob(encoded)

export default class Play extends Component {

  constructor(props){
    super(props)
    const { match } = props
    this.state = {
      src: match ? decode(match.params.encoded || '') : ''
    }
  }

  componentWillReceiveProps(nextProps) {
    const { match } = this.props
    if ( match !== nextProps.match ) {
      this.setState({
        src: nextProps.match ? decode(nextProps.match.params.encoded || '') : ''
      })
    }
  }

  loadReadme = (readme) =>  () => {    
    const { onSourceSelection } = this.props
    onSourceSelection(`https://raw.githubusercontent.com/${readme}`)
  }
  
  render() {
    const { src } = this.state
    const { onSourceSelection, file } = this.props
    const hasSrc = (src || file) 
    return (
      <Main hasSrc={hasSrc}>
        <LoadForm onSelected={onSourceSelection} src={src} file={file}/>
        <Section>
          <Postcast
            src={src}
            file={file}
          />
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
`