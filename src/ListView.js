import React, { Component } from 'react';
import {
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import { styles, sliderWidth, itemWidth, BrandColor } from '../styles/GlobalStyle'
import Frisbee from 'frisbee'
import Carousel from 'react-native-snap-carousel'
import StarRating from 'react-native-star-rating'
import TimeAgo from 'react-native-timeago'
import Ionicon from 'react-native-vector-icons/Ionicons'
import FlipCard from 'react-native-flip-card'
import MoviePosterBack from './MoviePosterBack.js'

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
    headerStyle:{ position: 'absolute', borderBottomColor: BrandColor, borderBottomWidth: .25, backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0 },
    headerTintColor: BrandColor
  }

  constructor(props) {
      super(props) 
      this.state = {
          loading: true,
          flipIndex: null,
          isFlipped: false,
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
    } catch (err) {
        this.setState({loading: false})
        console.log(err)
    }
  }

  render() {

    const { navigate } = this.props.navigation
    const posters = this.state.loading ? <View /> : this.state.movies.map((movie, index) => {
        return (
            <View key={index} style={styles.container}>
                <View>
                    <View  style={styles.slide}>
                        <FlipCard
                            style={{borderRadius: 4, borderWidth: 0, position: 'absolute'}}
                            friction={12}
                            perspective={2000}
                            flipHorizontal={true}
                            flipVertical={false}
                            flip={ this.state.flipIndex === index ? this.state.isFlipped : false}
                            clickable={true}
                            onFlipped={(isFlipped)=>{
                                console.log('isFlipped ', this.state.flipIndex, this.state.isFlipped)
                                }}>
                        <Image 
                            style={ styles.poster }
                            source={{ uri: 'https://image.tmdb.org/t/p/w500/' + movie.poster_path + '' }}
                            />

                        <MoviePosterBack  navigation={ this.props.navigation } movie={ movie } />
                        
                        </FlipCard>
                        <View style={ styles.posterDetail }>
                            <View style={ styles.ratingContainer }>
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
                                <Text style={{ color: BrandColor }}>
                                    Realeased <TimeAgo time={ movie.release_date } />
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => {
                                this.setState({ 
                                        flipIndex: index,
                                        isFlipped: this.state.isFlipped ? false : true, 
                                    })
                                }}>
                                <Ionicon style={styles.infoCircle} name="ios-information-circle-outline" size={35} color={BrandColor} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
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
                    swipeThreshold={20}
                    inactiveSlideOpacity={.8}
                    inactiveSlideScale={.9}
                    decelerationRate={'normal'}
                    onSnapToItem={(slideIndex) => {this.setState({isFlipped: false})}}>

                    { posters }
                    
                </Carousel>
            </Image>
        )
    }
}