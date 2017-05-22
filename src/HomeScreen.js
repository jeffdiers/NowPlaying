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
    headerStyle:{ position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0 },
    // headerStyle: { backgroundColor: 'black' },
    // headerTintColor: 'white',
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <Button
          onPress={() => navigate('List')}
          title="View movies now playing"
        />
      </View>
    )
  }
}