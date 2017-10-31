import React, { Component } from 'react';
import styled, { keyframes } from 'react-emotion'

import PostCast from './components/postcast'
import LoadForm from './components/load-form'
import ErrorModal from './components/error-modal'

class App extends Component {
  
  constructor(props){
    super(props)
    this.state =  {
      src: undefined,
      error: null,
      errorInfo: null
    }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  handleSourceSelection = (src) => {
    this.setState({
      error: false,
      src
    })
  }

  render() {
    const { src, error } = this.state

    return (
      <Wrapper>
        {error && <ErrorModal>Error Ocurred</ErrorModal> }
        <div className="App-header">
          <h2>PostCast MVP</h2>
          <LoadForm onSelected={this.handleSourceSelection}/>
        </div>

        {!error && <PostCast className="PostCast" src={src}/>}
      </Wrapper>
    );
  }
}

export default App;


const spinFrames = keyframes`
from { transform: rotate(0deg); }
to { transform: rotate(360deg); }
`;

const Wrapper = styled.div`
text-align: center;
& .App-logo {
  animation: ${spinFrames} infinite 10s ease-in-out;
  height: 80px;
}
& .App-header {
  background-color: #222;
  height: 150px;
  padding: 20px;
}

& .PostCast {
  margin: 20px auto;
}
`;
