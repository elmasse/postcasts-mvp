import React from 'react'

import unified from 'unified'
import remarkParse from 'remark-parse'
import remark2rehype from 'remark-rehype'
import reactRenderer from 'rehype-react'
import raw from 'rehype-raw'
import u from 'unist-builder'
import h from 'hastscript'
import fm  from 'frontmatter'

import Frame from './frame'
import Caption from './frame/caption'
import Content from './frame/content'
import Code from './frame/code'

const onlyImages = (node) => {
  const { children } = node
  const filtered = children.filter((c) => !['\n'].includes(c.value))

  for (const child of filtered) {
    if ((child.tagName === 'a' && child.children[0].tagName !== 'img') || (child.tagName !== 'a' && child.tagName !== 'img')) return false
  }

  return true
}

const frameify = ({ data }) => (tree) => {
  const { children } = tree
  const frames = []
  let content, caption

  if (data && data.title) {
    content = h('postcast-content', [h('h1', [data.title])])
    frames.push(h('postcast-frame', [content]))
  }

  for (const node of children) {
    const { tagName } = node
    switch (tagName) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'img':
      case 'blockquote':
        content = h('postcast-content', [node])
        frames.push(h('postcast-frame', [content]))
        break
      case 'p':
        if (onlyImages(node)) {
          content = h('postcast-content', [node])
          frames.push(h('postcast-frame', [content]))
        } else {
          // const [lastFrame] = [...frames].reverse()
          // if (lastFrame && isFrameCode(lastFrame)) {
          //   lastFrame.children.push(caption)
          // } else {
          caption = h('postcast-caption', [node])
          frames.push(h('postcast-frame', [content, caption]))
          // }
        }
        break
      case 'pre':
        const { children, properties } = node.children[0]
        content = h('postcast-content', [
          h('postcast-code', properties, children)
        ])
        frames.push(h('postcast-frame', [content]))
        break
      case 'ul':
        const uls = node.children.filter((c) => !['\n'].includes(c.value))
        for (const child of uls) {
          content = h('postcast-content', [h('ul', [child])])
          frames.push(h('postcast-frame', [content]))
        }
        break
      default:
        console.warn(`${tagName} is not processed`)
        break
    }

  }

  return u('root', frames)
}

const cleanNodes = () => tree => {
  tree.children = tree.children.filter(c => !!c.tagName)
  return tree
}

const process = markdown => {

  const { data, content } = fm(markdown)

  return unified()
    .use(remarkParse)
    .use(remark2rehype, { allowDangerousHTML: true })
    .use(raw)
    .use(cleanNodes)
    .use(frameify, { data })
    .use(reactRenderer, {
      createElement: React.createElement,
      components: {
        'postcast-frame': Frame,
        'postcast-content': Content,
        'postcast-caption': Caption,
        'postcast-code': Code
      }
    })
    .processSync(content).contents.props.children
}

export default process