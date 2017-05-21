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
        <Image 
            style={{width: 300, height: 300}}
            source={{uri: 'https://image.tmdb.org/t/p/w500//y4MBh0EjBlMuOzv9axM4qJlmhzz.jpg'}}
            />
      </View>
    )
  }
}