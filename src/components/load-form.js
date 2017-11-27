import React, { Component } from 'react'
import styled from 'react-emotion'

export default class LoadForm extends Component {
    
  constructor(props) {
    super(props)

    this.state = {
      src: props.src || '',
      focused: !!props.src
    }
  }

  componentWillReceiveProps(nextProps) {
    const { src } = this.props
    if (src !== nextProps.src ) {
      this.setState({
        src: nextProps.src,
        focused: !!nextProps.src
      })
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

  render() {
    const { src, focused } = this.state
    return (
      <Form focused={focused}>
        <Input
          className={focused ? 'expanded' : ''}
          name="src"
          value={src}
          placeholder="Enter a url to a markdown file"
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />        
      </Form>
    )
  }

}

const Form = styled.div`
  display: flex;
  align-items: center;
`

const Input = styled.input`
  border: none;
  border-bottom: 1px solid #424242;
  background: rgba(0,0,0, 0);
  font-size: ${({ value }) => 20 - (value.length / 6)}px;
  height: 22px;
  color: #f1f1f1;
  font-weight: 100;
  outline-width: 0;
  width: 350px;
  text-align: center;
  transition: all .3s ease-in-out;

  &.expanded {
    width: 800px;
    height: 42px;
    font-size: ${({ value }) => 32 - (value.length / 6)}px;    
  }
`

