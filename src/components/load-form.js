import React, { Component } from 'react'
import styled from 'react-emotion'

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

  render() {
    const { src } = this.state
    return (
      <div>
        <Input 
          name="src"
          value={src}
          placeholder="url to markdown file"
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
        />
      </div>
    )
  }

}

const Input = styled.input`
  border: none;
  border-bottom: 1px solid #424242;
  background: rgba(0,0,0, 0);
  font-size: 32px;
  color: #f1f1f1;
  font-weight: 100;
  outline-color: #222;
  min-width: 500px;
`