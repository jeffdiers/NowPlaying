import React, { Component } from 'react';
import {
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Button
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
    baseURI: "https://api.themoviedb.org/3",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

export default class ListView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
    headerStyle:{ position: 'absolute', borderBottomColor: BrandColor, borderBottomWidth: .25, backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0 },
    headerTintColor: BrandColor
  })

  constructor(props) {
      super(props) 
      this.state = {
          loading: true,
          flipIndex: null,
          isFlipped: false,
          movies: {},
          genres: {}
      }
  }

  componentDidMount() {
    this._loadMoviesNowPlaying()
  }

  _loadMoviesNowPlaying = async () => {
    try {  
        const res_movies = await api.get('/movie/' + this.props.navigation.state.params.category + '?api_key=' + api_key + '&language=en-US&page=1',{
            body: {}
        })
        

        if (res_movies.err) throw res_movies.err

        this.setState({
            movies: res_movies.body.results,
        })
    } catch (err) {
        this.setState({loading: false})
        console.log(err)
    }

    try {
        const res_genres = await api.get('/genre/movie/list?api_key=' + api_key + '&language=en-US',{
            body: {}
        })

        if (res_genres.err) throw res_genres.err

        this.setState({
            loading: false,
            genres: res_genres.body.genres
        })
    } catch (err) {
        console.log(err)
    }
  }

  intersperse(arr, sep) {
        if (arr.length === 0) {
            return [];
        }

        return arr.slice(1).reduce(function(xs, x, i) {
            return xs.concat([sep, x]);
        }, [arr[0]]);
    }



  render() {
    const { navigate } = this.props.navigation
    const posters = this.state.loading ? <View /> : this.state.movies.map((movie, index) => {

        let genres = []
        // map genre ids to genre name and push into array
        this.state.genres.map((genre, genre_index) => { 
            movie.genre_ids.map((id, movie_genre_index) => { 
                return genre.id === id ? genres.push(genre.name) : null 
            }) 
        })

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

                        {/*front side*/}
                        <Image 
                            style={ styles.poster }
                            source={{ uri: 'https://image.tmdb.org/t/p/w500/' + movie.poster_path + '' }}
                            />

                        {/*back side*/}
                        <View style={ styles.flipSide }>
                            <View style={styles.flipSideContent}>
                                <View>
                                    <Image 
                                        style={ styles.backdrop }
                                        source={{ uri: 'https://image.tmdb.org/t/p/w500/' + movie.backdrop_path + '' }}
                                        />
                                    <View style={ styles.moviePosterBackCover }>
                                        <Text style={ styles.title }>{ movie.title }</Text>
                                        <Text style={styles.genres}>
                                            { this.intersperse(genres, ', ') }
                                        </Text>
                                        <Text numberOfLines={9} style={ styles.overview }>
                                            { movie.overview }
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.moreInfoButton}>
                                    <Button
                                        onPress={() => navigate('Detail', { movie_id: movie.id })}
                                        title="More info"
                                        />
                                </View>
                            </View>
                        </View>
                        </FlipCard>

                        {/*star rating under flipcard*/}
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


  
        



                                