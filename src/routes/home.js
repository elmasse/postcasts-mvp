import React, { Component } from 'react'
import styled from 'react-emotion'

import ga from '../analytics'

import Navigation from '../components/navigation'
import LoadForm from '../components/load-form'


const encode = (url) => btoa(url)

export default class Home extends Component {

  handleHomeNav = () => {
    const { history } = this.props
    history.push(`/`)
  }
  
  handleSourceSelection = (src) => {
    const { history } = this.props
    
    ga.send('event', { ec: 'load-src', ea: src })
    
    history.push(`/play/${encode(src)}`)
  }
  
  render() {
    return (
      <main>
        <Navigation onNavHome={this.handleHomeNav}/>
        <Content>
          <h2>What is it?</h2>
          <p>
            Postcast easily creates a simple video like experience for posts or guides.             
            It generates a stream with frames. These frames will contain the most important elements such as titles, lists, images, tables, etc. 
            All paragraphs will be used as captioned text.            
          </p>
          <h2>Why?</h2>
          <p>    
            Create video content is way too expensive in terms of time and effort. Specially for simple things like small guides.
            Interactivity is also really hard. You can't click on a link in a video. With Postcast you can. 
            It makes it easy to translate content with not much effort. And editing is, well, it's just text.
          </p>
          <h2>How does it look like?</h2>
          <p>
            Give it a try using the form below. You can click in any of the icons to load those project's Readme file.
            Or you can try your own! Just paste a url to a markdown file.
          </p>
        </Content>
        <LoadForm onSelected={this.handleSourceSelection} />        
      </main>
    )
  }
}

const Content = styled.div`
  max-width: 800px;
  margin: 30px auto 50px;

  p {
    line-height: 1.5;
    font-weight: 300;
  }

`