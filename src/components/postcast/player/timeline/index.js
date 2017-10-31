// import React, { Component } from 'react'
// import styled, { keyframes } from 'react-emotion'

// import unified from 'unified'
// import remarkParse from 'remark-parse'
// // import remarkFrontMatter from 'remark-frontmatter'
// import remark2rehype from 'remark-rehype'
// import reactRenderer from 'rehype-react'
// import raw from 'rehype-raw'
// import u from 'unist-builder'
// import h from 'hastscript'


// const headings = ['h1', 'h2']

// const frameify = () => (tree) => {
//   const { children } = tree
//   const frames = []
//   let frame

//   for ( const node of children ) {
//     const { tagName } = node
//     if ( headings.includes(tagName) ) {
//       frame = h('postframe',[node])
//     } else if (tagName === 'p') {
//       frame = h('postframe', { captions: node } , frame.children)
//     }

//     frames.push(frame)
//   }

//   return u('root', frames)
// }


// const process = markdown => {
//   return unified()
//     .use(remarkParse)
//     .use(remark2rehype, { allowDangerousHTML: true })
//     .use(raw)
//     .use(frameify)
//     .use(function() { this.Compiler = (t) => t })
//     .processSync(markdown).contents.children
// }

// export default class Timeline extends Component {

//   constructor (props) {
//     super(props)
//     const { markdown, active = 0 } = props
//     const frames = process(markdown)
//     this.state = {
//       active,
//       frames,
//       length: frames.length
//     }
//   }

//   componentWillReceiveProps({ active }) {
//     const { active: currentActive, length } = this.state

//     console.log(currentActive, length, active)

//     if (active < length && currentActive !== active ) {
//       this.setState({ active })
//     }

//     if (active >= length) this.notifyLastFrame()

//   }

//   notifyLastFrame() {
//     this.props.onLastFrame()
//   }

//   render () {
//     const { active, frames } = this.state

//     const Content = unified()     
//       .use(reactRenderer,{
//         createElement: React.createElement,
//         components: { 
//           postframe: Frame
//         }

//       })
//       .stringify(frames[active])

//     return (
//       <Viewport>{Content}</Viewport>
//     )
//   }

// }

// const Viewport = styled.div`
//   position: relative;
//   display: flex;
//   flex-direction: row;
//   align-items: stretch;
//   justify-content: center; 
//   flex: 1; 
// `

// const Framed = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: black;
//   background: white;
//   flex: 1;
// `

// const Frame = ({children, ...props}) => {
//   const { captions } = props
//   let caption
//   if (captions && captions.type === 'element') {
//     caption = unified()
//     .use(reactRenderer,{
//       createElement: React.createElement
//     })
//     .stringify(captions)
//   }
  
//   return (
//     <Framed>
//       {children}
//       {caption && <Captioned>{caption}</Captioned>}
//     </Framed>
//   ) 
// }

// //----

// const fadeIn = keyframes`
//   from { opacity: 0; }
//   to { opacity: 1; }
// `

// const Caption = styled.div`
//   position: absolute;
//   bottom: 30px;
//   background: rgba(0,0,0,.3);
//   color: black;
//   animation: ${fadeIn} .3s ease-in; 
// `

// class Captioned extends Component {

//   // constructor (props) {
//   //   super(props)
//   //   this.state = {
//   //     sentences: processCaptions(props.children)
//   //   }
//   // }


//   render () {
//     // const { sentences } = this.state
//     const { children } = this.props

//     return (<Caption>{children}</Caption>)
//   }
// }

