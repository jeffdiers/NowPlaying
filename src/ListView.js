import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar,
  Dimensions,
  Image
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import { styles, sliderWidth, itemWidth } from '../styles/GlobalStyle'
import Frisbee from 'frisbee'
import Carousel from 'react-native-snap-carousel'

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
    // headerStyle: { backgroundColor: 'white' },
    // headerTintColor: 'black'
  }

  constructor(props) {
      super(props) 
      this.state = {
          loading: true,
          movies: {}
      }
  }

  componentWillMount() {
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
    const posters = this.state.loading ? <View /> : this.state.movies.map((movie, index) => {
        return (
            <View key={index} style={styles.container}>
                <View  style={styles.slide}>
                    <Image 
                        style={ styles.poster }
                        source={{uri: 'https://image.tmdb.org/t/p/w500/' + movie.poster_path + ''}}
                        />
                </View>
            </View>
        )
    })

    return this.state.loading ? <Text>Loading</Text> :
    (
        <Carousel
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
        >
            { posters }
        </Carousel>
    )
    }
}