import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
      <Col  xs="10" />
          <Col>
            Text
          </Col>
        <Col  />
      </Container>
      </div>
    );
  }
}

export default App;
