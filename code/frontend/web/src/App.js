import React, { Component } from 'react';
import {
  Button,
  Input,
  Row,
  Col,
  Modal,
  ModalBody,
  Jumbotron
} from 'reactstrap';
import './App.css';

const backendURL = 'http://super-bot.pizza:14000';

class App extends Component {
  constructor(props) {
    super(props);
    this.sendMessage = this.sendMessage.bind(this);
    this.timerTask = this.timerTask.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      data: [],
      inputText: '',
      col: [],
      modal: true,
      update: false
    };
  }

  async fetchAsyncJSON(url, requestType) {
    try {
      let response = await fetch(url, {
        credentials: 'include',
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

  timerTask() {
    if (this.state.update) {
      this.setState({ update: false });
    } else {
      this.setState({
        modal: true,
        data: []
      });
      this.putChat();
    }
  }

  async putChat() {
    await this.fetchAsyncJSON(backendURL + '/createChat', 'GET');
  }

  async componentDidMount() {
    await this.putChat();
    this.timer = setInterval(this.timerTask, 30000);
  }

  sendMessage() {
    this.setState({ update: true });
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
    this.setState({ update: true });
    this.setState({
      inputText: evt.target.value
    });
  }

  toggle() {
    this.setState({ update: false });
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div className="App">
        <div>
          <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle}>
            <ModalBody>
              <Jumbotron>
                <h1>Super-Bot</h1>
                <p>
                  Super-Bot is an AI based ChatBot developt by AUT Students.
                </p>
                <p>
                  The Bot is based on basic technology and does not use any
                  third-party-services.
                </p>
                <p>
                  The project is not finished yet, so there is still a need for
                  optimization.
                </p>
                <hr />
                <p>
                  <h3>Created by:</h3>
                  <ul>
                    <li>Ashton Ho</li>
                    <li>Shailendrasinh Vijaysinh Jadeja</li>
                    <li>Antony Nugroho</li>
                    <li>Florian Widder</li>
                  </ul>
                </p>
                <hr />
                <p>
                  <Button size="lg" color="primary" onClick={this.toggle}>
                    Try it!
                  </Button>
                </p>
                <p>
                  For optimization we are saving all messages anonymously. You
                  accept this by using the Bot.
                </p>
              </Jumbotron>
            </ModalBody>
          </Modal>
        </div>
        <Col sm="12" md={{ size: 4, offset: 4 }}>
          <Row className="Head">
            <Col md={{ size: 6, offset: 3 }}>
              <h1 className="Head">Super-Bot</h1>
            </Col>
          </Row>
          {this.state.data.map(function(data, index) {
            return (
              <div>
                <Row>
                  <p>You: {data.question}</p>
                </Row>
                <Row>
                  <p>Bot: {data.answer}</p>
                </Row>
              </div>
            );
          })}
          <Row>
            <Col>
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
            </Col>
            <Col xs="auto">
              <Button color="primary" onClick={this.sendMessage}>
                Send
              </Button>
            </Col>
          </Row>
          <div
            style={{ clear: 'both' }}
            ref={el => {
              this.messagesEnd = el;
            }}
          />
        </Col>
      </div>
    );
  }
}

export default App;
