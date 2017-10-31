
import { Component } from 'react'

import ReactDOM from 'react-dom'

export default class ErrorModal extends Component {

  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    this.modalRoot = document.getElementById('errors')    
  }

  componentDidMount() {
    const { modalRoot } = this
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    const { modalRoot } = this
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    );
  }}