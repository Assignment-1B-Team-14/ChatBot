import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  TouchableHighlight,
  Button,
  Keyboard
} from 'react-native';
import dataInit from './demodata.json';

{
  /* Constant for rendering ListView */
}
const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.sendMessage = this.sendMessage.bind(this);
    this.state = {
      data: dataInit,
      dataSource: ds.cloneWithRows(dataInit),
      inputText: ''
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
    this.setState({
      dataSource: ds.cloneWithRows(this.state.data)
    });
    this.setState({ inputText: '' });
    this.listView.scrollToEnd();
    Keyboard.dismiss();
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.header}>
          <Text style={styles.head}>Demo App</Text>
        </View>
        <View style={styles.content}>
          <ListView
            ref={listView => {
              this.listView = listView;
            }}
            dataSource={this.state.dataSource}
            renderRow={rowData => (
              <View>
                <View style={styles.seperator} />
                <TouchableHighlight
                  onPress={() => {
                    Alert.alert(rowData.sender, rowData.message);
                  }}>
                  <Text style={styles.row}>
                    {rowData.sender} -> {rowData.reciever}: {rowData.message}
                  </Text>
                </TouchableHighlight>
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
    textAlign: 'center',
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
    backgroundColor: 'powderblue'
  },
  footer: {
    flex: 2,
    backgroundColor: 'lightgrey',
    flexDirection: 'row'
  }
});
