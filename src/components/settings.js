import React, { Component } from 'react'
import styled from 'react-emotion'

export default class Settings extends Component {
  static defaultProps = {
    language: 'en-US'
  }

  state = {
    language: this.props.language,
    phonemes: this.props.phonemes,
    phoneme: {
      key: '', value: ''
    },  
    open: false
  }

  componentWillReceiveProps({language, phonemes}) {
    this.setState({
      language,
      phonemes
    })
  }

  handleLangChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handlePhonemeChange = (e) => {
    const { phoneme } = this.state
    this.setState({
      phoneme: {
        ...phoneme,
        [e.target.name]: e.target.value
      }
    })
  }

  addPhoneme = () => {
    const { phonemes, phoneme } = this.state
    this.setState({
      phonemes: {
        ...phonemes,
        [phoneme.key]: [phoneme.value]
      },
      phoneme: {
        key: '', value: ''
      }
    })
  }


  removePhoneme = (key) => {
    const { phonemes } = this.state
    delete phonemes[key]
    this.setState({
      phonemes
    })

  }

  onSave = () => {
    const { language, phonemes } = this.state
    this.props.onSave({ language, phonemes })
  }

  render() {
    const { language, phonemes, phoneme, open } = this.state
    return (
      <Container open>
        <Handler onClick={() => { this.setState((state) => ({ open: !state.open })) }}>
        {open ? '▹' : '▿'} Settings
        </Handler>
        <Container open={open}>
          <Label htmlFor="language">Language </Label>
          <Input
            list="language"
            name="language"
            value={language}
            onChange={this.handleLangChange}/>
          <datalist id="language">
            <option value="en-US"/>
            <option value="en-GB"/>
            <option value="es-ES"/>
            <option value="es-AR"/>
          </datalist>
          <br/>
          <Label>Phonemes </Label>
          <div key={`phoneme-new`}>
            <Input name="key" value={phoneme.key} onChange={this.handlePhonemeChange}/>
            <Input name="value" value={phoneme.value} onChange={this.handlePhonemeChange} />
            {/* <Input ref={ key => this.keyPhoneme = key } />
            <Input ref={ value => this.valuePhoneme = value} /> */}
            <Button onClick={this.addPhoneme}>+</Button>
          </div>
          {
            phonemes &&
            Object.keys(phonemes).map((k, index) => {
              return (
                <div key={`phoneme-${index}`}>
                  <Input readOnly value={k} />
                  <Input readOnly value={phonemes[k]}/>
                  <Button onClick={(e) => this.removePhoneme(k)} red>-</Button>
                </div>
              )
            })
          }
          <Actions>
            <Button onClick={this.onSave} style={{width: 100}}>Save</Button>
          </Actions>
        </Container>
      </Container>
    )
  }
}

const Container = styled('div')`
  display: ${ ({ open }) => !open ? 'none' : 'block'  };
`

const Handler = styled('h3')`
`

const Actions = styled('div')`
  padding: 10px 0;
`
const Label = styled('h4')`
  font-size: 1em;
  font-weight: 200;  
`

const Input = styled('input')`
  border: 1px solid #444;
  padding: 5px;
`

const Button = styled('button')`
  border: 1px solid #444;
  padding: 5px;
  min-width: 32px;
  background-color: ${({red}) => red ? '#C12127' : '#C0C0C0'}
`
