import React, { Component } from 'react'
import styled, { keyframes } from 'react-emotion'

import ReactIcon from './icons/react'
import ReduxIcon from './icons/redux'


export default class LoadForm extends Component {
  
  // static defaultProps = {
  //   src: 'posts/first.md'
  // }
  
  constructor(props) {
    super(props)

    this.state = {
      src: props.src || ''
    }
  }

  handleInputChange = (event) => {
    const { name, value } = event.target

    this.setState({
      [name]: value
    })
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()      
      this.handleSubmit()
    }
  }

  handleSubmit = () => {
    const { onSelected } = this.props
    const { src } = this.state
    onSelected(src)
  }

  handleFocus = () => {
    this.setState({focused: true})
  }

  handleBlur = () => {
    
    this.setState(({src, focused}) => ({focused: !!src}) )
  }


  loadReact = () => {    
    this.props.onSelected('https://raw.githubusercontent.com/facebook/react/master/README.md')
  }

  loadRedux = () => {
    this.props.onSelected('https://raw.githubusercontent.com/reactjs/redux/master/README.md')
  }
  
  render() {
    const { src, focused } = this.state
    return (
      <Form focused={focused}>
        <Input
          className={focused ? 'expanded' : ''}
          name="src"
          value={src}
          placeholder="url to markdown file"
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <Message>Or try these README.md from github</Message>
        <ReactIcon onClick={this.loadReact} height="40" width="40" />
        <ReduxIcon onClick={this.loadRedux} height="40" width="40" />
        
      </Form>
    )
  }

}

const Form = styled.div`
  display: flex;
  align-items: center;

  > svg, > div {
    display: ${ ({focused}) => focused ? 'none' : 'block' };
  }
`


const Input = styled.input`
  border: none;
  border-bottom: 1px solid #424242;
  background: rgba(0,0,0, 0);
  font-size: ${({ value }) => 32 - (value.length / 6)}px;
  height: 42px;
  color: #f1f1f1;
  font-weight: 100;
  outline-color: #222;
  width: 400px;

  &.expanded {
    width: 800px;
  }
`

const Message = styled.div`
  font-size: 14px;
  margin: 0 20px;
  font-weight: 100;

`