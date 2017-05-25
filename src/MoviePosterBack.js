import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Button,
  Animated
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import { styles, sliderWidth, itemWidth, BrandColor } from '../styles/GlobalStyle'
import Frisbee from 'frisbee'

const api_key = '8da455281906a386fa15ac3854f3e4fc'

const api = new Frisbee({
    baseURI: "https://api.themoviedb.org/3/movie",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

export default class MoviePosterBack extends Component {
    static navigationOptions = {
        title: 'Poster Back',
        headerStyle:{ position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0 },
    }

    constructor(props) {
        super(props)
        this.state = {
            movieInfo: {},
            loading: true,
            fadeAnim: new Animated.Value(0), // opacity 0
        }
    }

    componentDidMount() {
        this._renderMovieInfo(this.props.movie.id)

          Animated.timing(       // Uses easing functions
            this.state.fadeAnim, // The value to drive
            {
              toValue: 1,        // Target
              duration: 1500,    // Configuration
            },
          ).start();             // Don't forget start!
    }

    _renderMovieInfo = async (movie_id) => {
        try {  
            const genre_res = await api.get('/' + movie_id + '?api_key=' + api_key + '&language=en-US',{
                body: {}
            })

            const credits_res = await api.get('/' + movie_id + '/credits?api_key=' + api_key + '&language=en-US',{
                body: {}
            })

            if (genre_res.err) throw genre_res.err
            if (credits_res.err) throw credits_res.err


            console.log('render movie genre ', credits_res.body)
            this.setState({
                movieInfo: genre_res.body,
                movieCredits: credits_res.body,
                loading: false
            })

        } catch (err) {
            this.setState({loading: false})
            console.log(err)
        }
    }

    render () {
        const { navigate } = this.props.navigation
        const cast = this.state.loading ? <View /> : this.state.movieCredits.cast.slice(0, 3).map((person, index) => {
            return (
                <Text key={index} style={ styles.overview }>
                    { person.character }: { person.name }
                </Text>
            )
        })
        const crew = this.state.loading ? <View /> : this.state.movieCredits.crew.slice(0, 3).map((person, index) => {
            return (
                <Text key={index} style={ styles.overview }>
                    { person.department }: { person.name }
                </Text>
            )
        })

        return this.state.loading ? <View style={ styles.flipSide } />: (
                <View style={ styles.flipSide }>
                    <Animated.View style={[ styles.flipSideContent, { opacity: this.state.fadeAnim } ]}>
                        <View>
                            <Image 
                                style={ styles.backdrop }
                                source={{ uri: 'https://image.tmdb.org/t/p/w1000/' + this.props.movie.backdrop_path + '' }}
                                />
                            <View style={ styles.moviePosterBackCover }>
                                <Text style={ styles.title }>{ this.props.movie.title }</Text>
                                <Text style={ styles.tagline }>{ this.state.movieInfo.tagline }</Text>
                                <Text style={ styles.subtitle }>
                                    Cast
                                </Text>
                                    { cast }
                                <Text style={ styles.subtitle }>
                                    Crew
                                </Text>
                                    { crew }
                            </View>
                        </View>
                        <View style={styles.moreInfoButton}>
                            <Button
                                onPress={() => navigate('Detail', { movieInfo: this.state.movieInfo })}
                                title="More info"
                                />
                        </View>
                    </Animated.View>
                </View>
        )
    }
}