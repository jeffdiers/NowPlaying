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
import Frisbee from 'frisbee'

const api = new Frisbee({
    baseURI: "https://api.themoviedb.org/3/movie/now_playing?api_key=8da455281906a386fa15ac3854f3e4fc&language=en-US&page=1",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

export default class ListView extends Component {
  static navigationOptions = {
    title: 'Now Playing',
    headerStyle: { backgroundColor: 'black' },
    headerTintColor: 'white'
  }

  constructor(props) {
      super(props) 
      this.state = {
          loading: true,
      }
  }

  componentDidMount() {
    this._loadMoviesNowPlaying()
  }

  _loadMoviesNowPlaying = async () => {
    try {  
        const res = await api.get('',{
            body: {}
        })

        if (res.err) throw res.err

        this.setState({
            loading: false,
            movies: res.body.results
        })
        console.log(this.state.movies)

    } catch (err) {
        this.setState({loading: false})
        console.log(err)
    }
  }

  render() {
    return this.state.loading ? <Text>Loading</Text> :
    (<View style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <Text style={styles.welcome}>
          List of movies playing now.
          {this.state.movies[0].title}
        </Text>
      </View>
    )
  }
}