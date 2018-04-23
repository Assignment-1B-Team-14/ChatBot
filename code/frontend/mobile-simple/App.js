import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
        <View style={styles.container}>
          <Text />
          <Text />
          <Text />
          <Text />
          <Text />
          <Text />
          <Text />
          <Text style={styles.text}> Text </Text>
          <Text style={styles.textRight}>aaext </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignContent: 'stretch',
  },text: {
    color: '#0f0',
    alignContent: 'center',
  },textRight: {
    color: '#ffff00',
    alignContent: 'flex-end',
    textAlign: 'right',
    height: 340,
  }

});
