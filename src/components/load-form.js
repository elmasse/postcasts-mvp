import React, { Component } from 'react'
import styled from 'react-emotion'
import gh from 'parse-github-url'

export default class LoadForm extends Component {
    
  constructor(props) {
    super(props)

    this.state = {
      src: props.src || '',
      focused: !!props.src,
      fixed: ''
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
      if (!this.shouldFixUrl()) {
        this.handleSubmit()
      }
    }
  }

  shouldFixUrl() {
    const { src } = this.state
    const { protocol, hostname, owner, name, blob } = gh(src)

    if (hostname === 'github.com') {

      this.setState({
        hostname,
        fixed: `${protocol}//raw.githubusercontent.com/${owner}/${name}/${blob}`
      })
      
      return true
    }
    return false
  }

  handleFixed = () => {
    const { onSelected } = this.props
    const { fixed } = this.state

    this.setState({
      src: fixed,
      fixed: '',
      hostname: ''
    })
    
    onSelected(fixed)
    
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
    const { src, focused, hostname, fixed } = this.state
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
        <Message show={!!fixed}>
           {hostname} does not provide a markdown file. You might want to try
           <Fix onClick={this.handleFixed}>{fixed}</Fix>
        </Message>
      </Form>
    )
  }

}

const Form = styled.div`
  display: flex;
  flex-direction: column;
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

const Message = styled.div`
  display: ${({ show }) => show ? 'block': 'none'};
  transition: all .3s ease-in-out;
  font-weight: 200;
  text-align: center;
  padding: 10px;
  background: rgba(200, 0 , 0, .5);
  margin-top: 10px;    
`

const Fix = styled.div`
  text-decoration: underline;
  font-weight: 300;
  cursor: pointer;
`
