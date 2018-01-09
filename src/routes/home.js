import React, { Component } from 'react'
import styled from 'react-emotion'

import ga from '../analytics'

import Navigation from '../components/navigation'
import LoadForm from '../components/load-form'
import Postcast from '../components/postcast'


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
      <div>
        <Navigation onNavHome={this.handleHomeNav}/>
        <Main>
          <Title>Create &amp; watch lessons differently.</Title>
          <Paragraph>
            Postcast enables a different way to create content for lessons, guides or posts. You can use any markdown file
            to generate a postcast. Watch this little introduction to learn more!
          </Paragraph>
          <Postcast src="/posts/intro.md" width="800" height="480"/>          
          <Title>Interactive. Searchable.</Title>
          <Paragraph>
            You can't click on a link in a video. With Postcast you can. Same for searching for content in a video you watched. 
            Translating a video requires to add subtitles, but you don't translate the content. Postcast makes it easy to translate content with not much effort. And editing is, well, it's just text.
          </Paragraph>
          <Title>Pause. Select &amp; Copy.</Title>
          <Paragraph>
            When you watch a video and you want to copy code or an example, or even just trying to copy a phrase you liked it's almost impossible.
            Postcast lets you pause, select and copy any content.
          </Paragraph>  
        </Main>
        <Section>
          <Title>Try it now!</Title>
          <Paragraph>
            Give it a try using the form below. You can click in any of the icons to load those project's Readme file.
            Or you can try your own! Just paste a url to a markdown file.
          </Paragraph>
          <LoadForm onSelected={this.handleSourceSelection} />
        </Section>
      </div>
    )
  }
}

const Main = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  
  max-width: 800px;
  margin: 50px auto 50px;
`

const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 50px;
  background: #f1f1f1;
  color: black;
  min-height: 30vh;
`

const Title = styled.h2`
  font-size: 2.5em;
  font-weight: 400;
  font-family: 'PT Serif';
  text-align: center;
`

const Paragraph = styled.p`
  font-size: 1.2em;
  line-height: 1.5;
  font-weight: 300;
  text-align: center;
  margin: 25px 0;
`