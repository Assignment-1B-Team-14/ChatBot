import React, { Component } from 'react';
import { Button, Input, Row } from 'reactstrap';
import './App.css';
import dataInit from './demodata.json';
import JsonTable from 'ts-react-json-table';

class App extends Component {
  constructor(props) {
    super(props);
    this.sendMessage = this.sendMessage.bind(this);
    this.state = {
      data: dataInit,
      inputText: '',
      col: [
        { key: 'sender', label: 'Sender:' },
        {
          key: 'receiver',
          label: 'Receiver:'
        },
        {
          key: 'message',
          label: 'Message:'
        }
      ]
    };
  }

  sendMessage() {
    const tmp = this.state.data;
    tmp.push({
      sender: 'ONE',
      receiver: 'TWO',
      message: this.state.inputText
    });
    this.setState({ data: tmp });
    this.setState({ inputText: '' });
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  updateInputValue(evt) {
    this.setState({
      inputText: evt.target.value
    });
  }

  render() {
    return (
      <div className="App">
        <Row>
          <h1>Demo Page</h1>
        </Row>
        <Row>
          <JsonTable
            className="App"
            caption="Messages:"
            rows={this.state.data}
            columns={this.state.col}
          />
        </Row>
        <Row>
          <Input
            placeholder="Type here!"
            value={this.state.inputText}
            onChange={evt => this.updateInputValue(evt)}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                this.sendMessage();
              }
            }}
          />
          <Button color="primary" onClick={this.sendMessage}>
            Send
          </Button>
        </Row>
        <div
          style={{ float: 'left', clear: 'both' }}
          ref={el => {
            this.messagesEnd = el;
          }}
        />
      </div>
    );
  }
}

export default App;
