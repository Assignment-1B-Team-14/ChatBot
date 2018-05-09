import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  Button,
  Keyboard
} from 'react-native';

{
  /* Constant for rendering ListView */
}
const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

const backendURL = 'http://super-bot.pizza:14000';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.sendMessage = this.sendMessage.bind(this);
    this.getMessage = this.getMessage.bind(this);
    this.state = {
      data: [],
      dataSource: ds.cloneWithRows([]),
      inputText: ''
    };
  }

  async fetchAsyncJSON(url, requestType) {
    try {
      let response = await fetch(url, {
        credentials: 'same-origin',
        method: requestType
      });
      let data = await response.json();
      return data;
    } catch (error) {
      Alert.alert('Error', 'Network Error! Cant access Server.');
      console.error(error);
    }
  }

  async getMessage(message) {
    await this.fetchAsyncJSON(
      backendURL + '/chat?message=' + message,
      'GET'
    ).then(response =>
      this.setState({
        dataSource: ds.cloneWithRows(response.response.messages)
      })
    );
  }

  async putChat() {
    await this.fetchAsyncJSON(backendURL + '/createChat', 'GET');
  }

  async componentDidMount() {
    await this.putChat();
  }

  sendMessage() {
    this.getMessage(this.state.inputText);
    this.setState({ inputText: '' });
    this.listView.scrollToEnd();
    Keyboard.dismiss();
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.header}>
          <Text style={styles.head}>SuperBot</Text>
        </View>
        <View style={styles.content}>
          <ListView
            ref={listView => {
              this.listView = listView;
            }}
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={rowData => (
              <View>
                <View style={styles.seperator} />
                <Text style={styles.row}>You: {rowData.question}</Text>
                <View style={styles.seperator} />
                <Text style={styles.row}>Bot: {rowData.answer}</Text>
                <View style={styles.seperator} />
              </View>
            )}
          />
        </View>
        <View style={styles.footer}>
          <TextInput
            style={styles.input}
            placeholder="Type here!"
            onChangeText={inputText => this.setState({ inputText })}
            value={this.state.inputText}
          />
          <Button
            title="Send"
            onPress={this.sendMessage}
            accessibilityLabel="Send a message."
            style={styles.sendButton}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const styles = StyleSheet.create({
  sendButton: {
    flex: 2,
    fontSize: 30
  },
  seperator: {
    height: 10
  },
  row: {
    fontSize: 30
  },
  input: {
    flex: 5,
    fontSize: 20
  },
  head: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 45
  },
  container: {
    height: window.height,
    width: window.width,
    backgroundColor: '#000',
    justifyContent: 'space-between'
  },
  header: {
    flex: 3,
    backgroundColor: 'lightgrey'
  },
  content: {
    width: window.width,
    flex: 20,
    backgroundColor: 'lightgrey'
  },
  footer: {
    flex: 2,
    backgroundColor: 'lightgrey',
    flexDirection: 'row'
  }
});
