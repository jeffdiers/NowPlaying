import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import styles from '../styles/GlobalStyle'

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Welcome',
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
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

class ListView extends Component {
  static navigationOptions = {
    title: 'Now Playing',
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          List of movies playing now.
        </Text>
      </View>
    )
  }
}

const NowPlaying = StackNavigator({
  Home: { screen: HomeScreen },
  List: { screen: ListView },
})

module.exports = NowPlaying


