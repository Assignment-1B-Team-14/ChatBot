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
                <div>
                  <h3>SUPER-BOT manual</h3>
                  <h4>Commands Lists</h4>
                  <ul>
                    <li>
                      <em>
                        <strong>REQ</strong>{' '}
                      </em>followed by paper code to show the requisite papers
                    </li>
                    <li>
                      <em>
                        <strong>MAJOR FOR</strong>
                      </em>&nbsp;followed by paper name&nbsp;to find the paper
                      required for spesific paper
                    </li>
                    <li>
                      <em>
                        <strong>JOB&nbsp;NAME</strong>
                      </em>{' '}
                      ex IT SUPERVISOR to find the paper required for (ex IT
                      SUPERVISOR)
                    </li>
                    <li>
                      <em>
                        <strong>FAILED followed</strong>{' '}
                      </em>by paper code to find out what paper you can not take
                      if you failed on a paper
                    </li>
                    <li>
                      <em>
                        <strong>HELP</strong>{' '}
                      </em>to get a help
                    </li>
                    <li>
                      <em>
                        <strong>JOBS</strong>&nbsp;
                      </em>to list all possible jobs
                    </li>
                  </ul>
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
                  <hr />
                  <h4>BOT contacts:</h4>
                  <p>
                    <a href="mailto:super-bot@fw-software.com">
                      super-bot@fw-software.com
                    </a>
                  </p>
                </div>
                <hr />
                <p>
                  <h4>Created by:</h4>
                  <ul>
                    <li>Ashton Ho</li>
                    <li>Shailendrasinh Vijaysinh Jadeja</li>
                    <li>Antony Nugroho</li>
                    <li>Florian Widder</li>
                  </ul>
                </p>
                <hr />
                <h4>Example</h4>
                <p>Human: REQ COMP501</p>
                <p>
                  Robot: The paper Computing Technology in Society (COMP501) has
                  no requisite papers
                </p>
                <hr />
                <p>Human: MAJOR FOR software development major&nbsp;</p>
                <p>
                  Robot: &nbsp;The papers required for sofware development major
                  are: Program Design and Construction Software Engineering
                  Software Development Practice Applied Human Computer
                  Interaction Operating Systems OR Physical Database Design Web
                  Development OR Distributed and Mobile Systems
                </p>
                <hr />
                <p>Human: IT SUPERVISOR</p>
                <p>
                  Robot: The papers required for a it supervisor are:
                  Foundations of Information Science Data Mining and Knowledge
                  Engineering Statistical Methods Artificial Intelligence Data
                  Structures and Algorithms OR Physical Database Design Text and
                  Vision Intelligence OR Nature Inspired Computing
                </p>
                <hr />
                <p>If there is no prerequisite for the paper</p>
                <p>Human: FAILED COMM501</p>
                <p>Robot: Sorry to hear that study harder next time</p>
                <p>If there is&nbsp; prerequisite for the paper</p>
                <p>Human: FAILED STAT500</p>
                <p>
                  Robot: &nbsp;&nbsp;I am sorry You can not enrol for STAT603.
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
