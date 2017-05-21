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
// import Frisbee from 'frisbee'
// import Carousel from 'react-native-snap-carousel'
import StarRating from 'react-native-star-rating'
import TimeAgo from 'react-native-timeago'
import Ionicon from 'react-native-vector-icons/Ionicons'
import FlipCard from 'react-native-flip-card'

export default class MoviePoster extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentWillMount() {
        // console.log(this.props.movie)
    }

    render () {
        return (
                <View style={ styles.flipSide }>
                    <Image 
                        style={ styles.backdrop }
                        source={{ uri: 'https://image.tmdb.org/t/p/w1000/' + this.props.movie.backdrop_path + '' }}
                        />
                    <Text style={ styles.title }>{ this.props.movie.title }</Text>
                    <Text style={ styles.subtitle }>Overview</Text>
                    <Text style={ styles.overview }>{ this.props.movie.overview }</Text>
                </View>
        )
    }
}


            /*<View style={[styles.container, {opacity: this.state.fade}]}>
                <View>
                    <View  style={styles.slide}>
                        <FlipCard
                            style={{borderRadius: 4, borderWidth: 0}}
                            friction={12}
                            perspective={2000}
                            flipHorizontal={true}
                            flipVertical={false}
                            flip={false}
                            clickable={true}>
                        <Image 
                            style={ styles.poster }
                            source={{ uri: 'https://image.tmdb.org/t/p/w500/' + this.props.movie.poster_path + '' }}
                            />
                        <View style={ styles.flipSide }>
                            <Image 
                                style={ styles.backdrop }
                                source={{ uri: 'https://image.tmdb.org/t/p/w1000/' + this.props.movie.backdrop_path + '' }}
                                />
                            <Text style={ styles.title }>{ this.props.movie.title }</Text>
                            <Text style={ styles.subtitle }>Overview</Text>
                            <Text style={ styles.overview }>{ this.props.movie.overview }</Text>
                        </View>
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
                                    rating={this.props.movie.vote_average / 2}
                                    starColor={BrandColor}
                                    disabled={true}
                                />
                                <Text style={{ color: BrandColor }}>
                                    Realeased <TimeAgo time={ this.props.movie.release_date } />
                                </Text>
                            </View>
                            
                        </View>
                    </View>
                </View>
            </View>*/