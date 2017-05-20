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

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Welcome',
    headerStyle: { backgroundColor: 'black' },
    headerTintColor: 'teal'
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <Text style={styles.welcome}>
          Welcome to NowPlaying
        </Text>
        <Button
          onPress={() => navigate('List')}
          title="View movies"
        />
      </View>
    )
  }
}