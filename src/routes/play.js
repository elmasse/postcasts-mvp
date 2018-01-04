import React, { Component } from 'react'
import styled from 'react-emotion'

import ga from '../analytics'

import Navigation from '../components/navigation'
import LoadForm from '../components/load-form'
import Postcast from '../components/postcast'

const encode = (url) => btoa(url)
const decode = (encoded) => atob(encoded)

export default class Play extends Component {

  constructor(props){
    super(props)
    const { match } = props
    this.state = {
      src: match ? decode(props.match.params.encoded) : ''
    }
  }

  componentWillReceiveProps(nextProps) {
    const { match } = this.props

    if ( match !== nextProps.match ) {
      this.setState({
        src: nextProps.match ? decode(nextProps.match.params.encoded) : ''
      })
    }
  }

  handleHomeNav = () => {
    const { history } = this.props
    history.push(`/`)
  }
  
  handleSourceSelection = (src) => {
    const { history } = this.props
    
    ga.send('event', { ec: 'load-src', ea: src })
    
    history.push(`/play/${encode(src)}`)
  }

  loadReadme = (readme) =>  () => {    
    this.handleSourceSelection(`https://raw.githubusercontent.com/${readme}`)
  }
  
  render() {
    const { src } = this.state
    return (
      <div>
        <Navigation onNavHome={this.handleHomeNav}/>
        <Main hasSrc={!!src}>
          <LoadForm onSelected={this.handleSourceSelection} src={src}/>
          <Section>
            <Postcast src={src}/>
          </Section>
        </Main>
      </div>
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