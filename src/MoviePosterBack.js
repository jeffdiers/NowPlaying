import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Button
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
            loading: true
        }
    }

    componentWillMount() {
        this._renderMovieInfo(this.props.movie.id)
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
        return this.state.loading ? <View /> : (
                <View style={ styles.flipSide }>
                    <ScrollView
                        ref={(scrollView) => { _scrollView = scrollView; }}
                        automaticallyAdjustContentInsets={false}
                        onScroll={() => { console.log('onScroll!'); }}
                        scrollEventThrottle={200}
                        style={styles.scrollView}>
                        <Image 
                            style={ styles.backdrop }
                            source={{ uri: 'https://image.tmdb.org/t/p/w1000/' + this.props.movie.backdrop_path + '' }}
                            />
                            <Text style={ styles.title }>{ this.props.movie.title }</Text>
                            <Text style={ styles.tagline }>{ this.state.movieInfo.tagline }</Text>
                            <Text style={ styles.subtitle }>Overview</Text>
                            <Text style={ styles.overview }>{ this.props.movie.overview }</Text>
                            <Text style={ styles.subtitle }>Cast</Text>
                            <Text style={ styles.overview }>{ this.state.movieCredits.cast[0].character }: { this.state.movieCredits.cast[0].name }</Text>
                            <Text style={ styles.overview }>{ this.state.movieCredits.cast[1].character }: { this.state.movieCredits.cast[1].name }</Text>
                            <Text style={ styles.overview }>{ this.state.movieCredits.cast[2].character }: { this.state.movieCredits.cast[2].name }</Text>
                            <Text style={ styles.subtitle }>Crew</Text>
                            <Text style={ styles.overview }>{ this.state.movieCredits.crew[0].department }: { this.state.movieCredits.crew[0].name }</Text>
                            <Text style={ styles.overview }>{ this.state.movieCredits.crew[1].department }: { this.state.movieCredits.crew[1].name }</Text>
                            <Text style={ styles.overview }>{ this.state.movieCredits.crew[2].department }: { this.state.movieCredits.crew[2].name }</Text>
                            <View style={styles.moreInfoButton}>
                                <Button
                                    onPress={() => navigate('Detail', { movieInfo: this.state.movieInfo })}
                                    title="More info"
                                    />
                            </View>
                    </ScrollView>
                </View>
        )
    }
}