import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar,
  Image,
  TouchableOpacity
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import { styles, BrandColor, BrandColorDark, BrandColorContrast } from '../styles/GlobalStyle'
import Ionicon from 'react-native-vector-icons/Ionicons'

export default class HomeScreen extends Component {
  static navigationOptions = {
    headerStyle:{ position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0 },
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.containerWelcome}>
        <StatusBar
            barStyle="light-content"
        />
        <View style={styles.logoContainer}>
            <Ionicon style={{marginRight: 10}} name="ios-videocam-outline" size={50} color={BrandColor} />
            <Text style={styles.welcomeTitle}>
                Now Playing 
            </Text>
        </View>
        <Text style={styles.welcomeText}>
            Welcome! This app displays movies that are currently playing. Tap 'View Movies' to get started.
        </Text>
        <Text style={styles.welcomeText}>
            Thank you for viewing my app!
        </Text>
        <TouchableOpacity onPress={() => navigate('List')} style={styles.welcomeButton}>  
                    <Text style={styles.welcomeButtonText}>View Movies</Text>
        </TouchableOpacity>
      </View>
    )
  }
}