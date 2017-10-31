import React, { Component } from 'react'
import styled from 'react-emotion'

import unified from 'unified'
import remarkParse from 'remark-parse'
// import remarkFrontMatter from 'remark-frontmatter'
import remark2rehype from 'remark-rehype'
import reactRenderer from 'rehype-react'
import raw from 'rehype-raw'
import u from 'unist-builder'
import h from 'hastscript'

import Frame from './frame'
import Caption from './frame/caption'
import Content from './frame/content'
import Code from './frame/code'

import Timeline from './timeline'
import Toolbar from './toolbar'


const onlyImages = (node) => {
  const { children } = node
  const filtered = children.filter((c) => !['\n'].includes(c.value))

  for ( const child of filtered ) {
    if (( child.tagName === 'a' && child.children[0].tagName !== 'img') || (child.tagName !== 'a' && child.tagName !== 'img' )) return false    
  }

  return true
}

const isFrameCode = (frame) => {
  const [ content ] = frame.children
  const { children } = content
  const [ child ] = children  

  return (children.length === 1 && child.tagName === 'postcast-code')

}

const frameify = () => (tree) => {
  const { children } = tree
  const frames = []
  let content, caption

  for ( const node of children ) {
    const { tagName } = node

    switch (tagName) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'img':
        content = h('postcast-content', [node])
        frames.push(h('postcast-frame',[content]))
        break
      case 'p':
        if (onlyImages(node)){
          content = h('postcast-content', [node])
          frames.push(h('postcast-frame',[content]))
        } else {
          // const [lastFrame] = [...frames].reverse()
          // if (lastFrame && isFrameCode(lastFrame)) {
          //   lastFrame.children.push(caption)
          // } else {
            caption = h('postcast-caption',[node])
            frames.push(h('postcast-frame', [content, caption]))  
          // }
        }
        break
      case 'pre':
        const { children, properties } = node.children[0]
        content = h('postcast-content',[
          h('postcast-code', properties, children)
        ])
        frames.push(h('postcast-frame', [content]))
        break
      default:
        break
    }

  }

  return u('root', frames)
}

const process = markdown => {
  return unified()
    .use(remarkParse)
    // .use(remarkFrontMatter)
    // .use(() => (tree) => {console.log(tree); return tree})
    .use(remark2rehype, { allowDangerousHTML: true })
    .use(raw)
    .use(frameify)
    .use(reactRenderer, {
      createElement: React.createElement,
      components: { 
        'postcast-frame': Frame,
        'postcast-content': Content,
        'postcast-caption': Caption,
        'postcast-code': Code
      }
    })
    .processSync(markdown).contents.props.children
}

export default class Player extends Component {

  constructor(props) {
    super(props)
    const { markdown } = props
    this.state = {
      active: 0,
      playing: false,
      frames: process(markdown)
    }
  }
  
  handlePlay = () => {
    this.setState({
      playing: true
    })
  }

  next = () => {
    const { active, frames } = this.state
    const next = active + 1

    if (next >= frames.length) {
      this.setState({
        playing: false
      })
    } else {
      this.setState({active: next})
    }

  }

  handlePause = () => {
    this.setState({
      playing: false
    })
  }

  handleStop = () => {
    this.setState({
      playing: false,
      active: 0
    })
  }

  render() {
    const { frames, active, playing } = this.state

    const frame = { ...frames[active] }
    frame.props = { ...frame.props, done: this.next, playing }
    
    return (
      <Container>

        <Viewport>
          {frame}
        </Viewport>

        <Toolbar 
          onPlay={this.handlePlay}
          onPause={this.handlePause}
          onStop={this.handleStop}
          playing={playing}
        />
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  flex: 1;
`

const Viewport = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center; 
  flex: 1; 
`