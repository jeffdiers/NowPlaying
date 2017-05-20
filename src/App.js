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
import HomeScreen from './HomeScreen'
import ListView from './ListView'

const NowPlaying = StackNavigator({
  Home: { screen: HomeScreen },
  List: { screen: ListView },
})

module.exports = NowPlaying


