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
import { styles, sliderWidth, itemWidth, BrandColor } from '../styles/GlobalStyle'
import Frisbee from 'frisbee'
import Carousel from 'react-native-snap-carousel'
import StarRating from 'react-native-star-rating'
import TimeAgo from 'react-native-timeago'
import Ionicon from 'react-native-vector-icons/Ionicons'
import FlipCard from 'react-native-flip-card'

const api_key = '8da455281906a386fa15ac3854f3e4fc'

const api = new Frisbee({
    baseURI: "https://api.themoviedb.org/3/movie",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

export default class ListView extends Component {
  static navigationOptions = {
    title: 'Now Playing',
    headerStyle:{ position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0 },
    // headerStyle: { backgroundColor: 'white' },
    headerTintColor: BrandColor
  }

  constructor(props) {
      super(props) 
      this.state = {
          loading: true,
          fade: new Animated.Value(0),
          flip: false,
          movies: {}
      }
  }

  componentDidMount() {
    this._loadMoviesNowPlaying()
  }

  _loadMoviesNowPlaying = async () => {
    try {  
        const res = await api.get('/now_playing?api_key=' + api_key + '&language=en-US&page=1',{
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

  _renderMovieGenre = async (movie_id) => {
    try {  
        const res = await api.get('/' + movie_id + '?api_key=' + api_key + '&language=en-US',{
            body: {}
        })

        if (res.err) throw res.err

        console.log(res.body.tagline)
        this.setState({
            movieTagline: res.body.tagline
        })

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
                        <FlipCard
                            style={{borderRadius: 4, borderWidth: 0}}
                            friction={12}
                            perspective={2000}
                            flipHorizontal={true}
                            flipVertical={false}
                            flip={this.state.flip}
                            clickable={true}>
                        <Image 
                            style={ styles.poster }
                            source={{uri: 'https://image.tmdb.org/t/p/w500/' + movie.poster_path + ''}}
                            />
                        <View style={ styles.flipSide }>
                            <Image 
                                style={ styles.backdrop }
                                source={{uri: 'https://image.tmdb.org/t/p/w1000/' + movie.backdrop_path + ''}}
                                />
                            <Text style={ styles.title }>{ movie.title }</Text>
                            <Text style={ styles.subtitle }>Overview</Text>
                            <Text style={ styles.overview }>{ movie.overview }</Text>
                            <Text>{this.state.movieTagline}</Text>
                        </View>
                        </FlipCard>
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
                                    starColor={BrandColor}
                                    disabled={true}
                                />
                                <Text style={{color: BrandColor}}>
                                    Realeased <TimeAgo time={movie.release_date} />
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Animated.View>
        )
    })

    return this.state.loading ? (
        <Image source={require('../assets/background.png')} style={styles.containerHome}>
        <StatusBar
            barStyle="light-content"
        />
        <ActivityIndicator
            animating={this.state.animating}
            style={[styles.centering, {height: 80}]}
            size="large"
        />
        </Image>
    ) : (
        <Image source={require('../assets/background.png')} style={styles.containerHome}>
           <StatusBar
                barStyle="light-content"
            />
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
        </Image>
    )
    }
}