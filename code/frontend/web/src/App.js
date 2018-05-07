import React, { Component } from 'react';
import { Button, Input, Row, Table } from 'reactstrap';
import './App.css';

const backendURL = 'http://super-bot.pizza:14000';

class App extends Component {
  constructor(props) {
    super(props);
    this.sendMessage = this.sendMessage.bind(this);
    this.state = {
      data: [],
      inputText: '',
      col: []
    };
  }

  async fetchAsyncJSON(url, requestType) {
    try {
      let response = await fetch(url, {
        method: requestType
      });
      let data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async getMessage(message) {
    try {
      await this.fetchAsyncJSON(
        backendURL + '/chat?message=' + message,
        'GET'
      ).then(response =>
        this.setState({
          data: response.response.messages
        })
      );
    } catch (error) {
      console.error(error);
    }
  }

  async putChat() {
    await this.fetchAsyncJSON(backendURL + '/createChat', 'GET');
  }

  async componentDidMount() {
    console.log('get Chat');
    await this.putChat();
    console.log('get message');
    await this.getMessage('Hi!');

    console.log('Date');
    console.log(this.state);
  }

  sendMessage() {
    this.getMessage(this.state.inputText);
    this.setState({ inputText: '' });
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  };

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
          <h1>SuperBot</h1>
        </Row>
        <Row>
          <Table>
            <tbody>
              {this.state.data.map(function(data, index) {
                return (
                  <tr>
                    <th>
                      <p>You: {data.request}</p>
                      <br />
                      <p>Bot: {data.response}</p>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </Table>
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
          style={{ clear: 'both' }}
          ref={el => {
            this.messagesEnd = el;
          }}
        />
      </div>
    );
  }
}

export default App;
