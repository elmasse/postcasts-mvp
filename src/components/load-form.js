import React, { Component } from 'react'

export default class LoadForm extends Component {
  
  static defaultProps = {
    src: 'posts/first.md'
  }
  
  constructor(props) {
    super(props)

    this.state = {
      src: props.src
    }
  }

  handleInputChange = (event) => {
    const { name, value } = event.target

    this.setState({
      [name]: value
    })
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
        <input 
          name="src"
          value={src}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleSubmit}>Load</button>
      </div>
    )
  }

}