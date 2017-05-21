import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Animated
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import { styles, sliderWidth, itemWidth } from '../styles/GlobalStyle'
import Frisbee from 'frisbee'
import Carousel from 'react-native-snap-carousel'
import StarRating from 'react-native-star-rating'
import TimeAgo from 'react-native-timeago'
import Ionicon from 'react-native-vector-icons/Ionicons'

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
          fade: new Animated.Value(0),
          movies: {}
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

        Animated.timing(
            this.state.fade,
            {
                toValue: 1,
                duration: 1000,
            },
        ).start()

    } catch (err) {
        this.setState({loading: false})
        console.log(err)
    }
  }

  render() {
    const { navigate } = this.props.navigation
    const posters = this.state.loading ? <View /> : this.state.movies.map((movie, index) => {
        return (
            <Animated.View key={index} style={[styles.container, {opacity: this.state.fade}]}>
                <View>
                    <View  style={styles.slide}>
                        <Image 
                            style={ styles.poster }
                            source={{uri: 'https://image.tmdb.org/t/p/w500/' + movie.poster_path + ''}}
                            />
                        <View style={styles.posterDetail}>
                            <View style={styles.ratingContainer}>
                                <StarRating
                                    stlye={{width: 50}}
                                    disabled={false}
                                    emptyStar={'ios-star-outline'}
                                    fullStar={'ios-star'}
                                    halfStar={'ios-star-half'}
                                    iconSet={'Ionicons'}
                                    maxStars={5}
                                    rating={movie.vote_average / 2}
                                    starColor={'black'}
                                    disabled={true}
                                />
                                <Text>
                                    Realeased <TimeAgo time={movie.release_date} />
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => navigate('Detail', { movie: movie})} style={styles.moreInfo}>
                                <View style={styles.infoIcon}>
                                    <Ionicon name="ios-information-circle" size={24} color='black' />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Animated.View>
        )
    })

    return this.state.loading ? (
        <ActivityIndicator
            animating={this.state.animating}
            style={[styles.centering, {height: 80}]}
            size="large"
        />
    ) : (
        <Carousel
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
        >
            { posters }
            <View style={styles.container}>
                <TouchableOpacity>
                    <View  style={styles.slide}>
                        <View style={ styles.loadMore }>
                            </View>
                        <View style={styles.ratingContainer}>
                            <Text>
                                Load More
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

        </Carousel>
    )
    }
}