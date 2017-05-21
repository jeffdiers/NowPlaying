import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar,
  Image
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import { styles } from '../styles/GlobalStyle'

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Welcome',
    // headerStyle: { backgroundColor: 'black' },
    // headerTintColor: 'white',
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {params.movie.title}
        </Text>
      </View>
    )
  }
}