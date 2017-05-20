import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import styles from '../styles/GlobalStyle'

export default class ListView extends Component {
  static navigationOptions = {
    title: 'Now Playing',
    headerStyle: { backgroundColor: 'black' },
    headerTintColor: 'teal'
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <Text style={styles.welcome}>
          List of movies playing now.
        </Text>
      </View>
    )
  }
}