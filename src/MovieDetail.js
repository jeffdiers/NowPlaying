import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StatusBar,
  Image,
  Linking,
  TouchableOpacity,
  ScrollView,
  findNodeHandle
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import { styles, BrandColor } from '../styles/GlobalStyle'
import numeral from 'numeral'
import Frisbee from 'frisbee'
import { BlurView } from 'react-native-blur';

const api_key = '8da455281906a386fa15ac3854f3e4fc'

const api = new Frisbee({
    baseURI: "https://api.themoviedb.org/3",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

export default class HomeScreen extends Component {
    static navigationOptions = {
        title: 'More Info',
        headerStyle:{ position: 'absolute', borderBottomColor: BrandColor, borderBottomWidth: .25, backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0 },
        headerTintColor: BrandColor
    }

    constructor(props) {
        super(props)
        this.state = { 
            loading: true,
            viewRef: null,
            movieInfo: {},
            movieCredits: {}
         };
    }

    componentDidMount() {
        this._loadMovieInfo(this.props.navigation.state.params.movie_id)
    }

    imageLoaded() {
        this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
    }

    _loadMovieInfo = async (movie_id) => {
        try {  
            const movieInfo_res = await api.get('/movie/' + movie_id + '?api_key=' + api_key + '&language=en-US',{
                body: {}
            })

            if (movieInfo_res.err) throw movieInfo_res.err

            this.setState({
                movieInfo: movieInfo_res.body,
            })

        } catch (err) {
            this.setState({loading: false})
            console.log(err)
        }

        try {  
            const credits_res = await api.get('/movie/' + movie_id + '/credits?api_key=' + api_key + '&language=en-US',{
                body: {}
            })

            if (credits_res.err) throw credits_res.err

            this.setState({
                movieCredits: credits_res.body,
                loading: false
            })

        } catch (err) {
            this.setState({loading: false})
            console.log(err)
        }
    }

    render() {

        const credits_length = 4

        const genres = this.state.loading ? <View /> : this.state.movieInfo.genres.map((genre, index) => { 
            return <Text key={index} style={ styles.movieDetail }>{ genre.name }</Text> 
        })
        const production_companies = this.state.loading ? <View /> : this.state.movieInfo.production_companies.map((production_companies, index) => { 
            return <Text key={index} style={ styles.movieDetail }>{ production_companies.name }</Text> 
        })
        const cast = this.state.loading ? <View /> : this.state.movieCredits.cast.slice(0, credits_length).map((person, index) => {
            return (
                <Text key={index} style={ styles.movieDetail }>
                    { person.character }: { person.name }
                </Text>
            )
        })
        const crew = this.state.loading ? <View /> : this.state.movieCredits.crew.slice(0, credits_length).map((person, index) => {
            return (
                <Text key={index} style={ styles.movieDetail }>
                    { person.department }: { person.name }
                </Text>
            )
        })

        return this.state.loading ? <View /> : (
            <View style={styles.container}>
                <Image
                    ref={(img) => { this.backgroundImage = img; }}
                    source={{ uri: 'https://image.tmdb.org/t/p/w1000/' + this.state.movieInfo.backdrop_path + '' }}
                    style={styles.absolute}
                    onLoadEnd={this.imageLoaded.bind(this)}
                    />
                <BlurView
                    style={styles.absolute}
                    viewRef={this.state.viewRef}
                    blurType="dark"
                    blurAmount={8}
                    />
                <View style={{backgroundColor: 'transparent'}}>
                    <ScrollView
                            ref={(scrollView) => { _scrollView = scrollView; }}
                            automaticallyAdjustContentInsets={false}
                            onScroll={() => { console.log('onScroll!'); }}
                            scrollEventThrottle={200}
                            style={styles.scrollView}>
                        <Text style={styles.movieDetailTitle}>
                            { this.state.movieInfo.title }
                        </Text>
                        <Text style={ styles.movieDetailSubtitle }>
                            Overview
                        </Text>
                        <Text style={ styles.movieDetail }>
                            { this.state.movieInfo.overview }
                        </Text>
                        <Text style={styles.movieDetailSubtitle}>
                            Genres
                        </Text>
                        { genres }
                        <Text style={styles.movieDetailSubtitle}>
                            Production Companies
                        </Text>
                        { production_companies }
                        <Text style={styles.movieDetailSubtitle}>
                            Cast
                        </Text>
                            { cast }
                        <Text style={styles.movieDetailSubtitle}>
                            Crew
                        </Text>
                            { crew }
                        <Text style={styles.movieDetailSubtitle}>
                            Budget
                        </Text>
                        <Text style={styles.movieDetail}>
                            { this.state.movieInfo.budget > 0 ? numeral(this.state.movieInfo.budget).format('($ 0 a)') : 'N/A' }
                        </Text>
                        <Text style={styles.movieDetailSubtitle}>
                            Revenue
                        </Text>  
                        <Text style={styles.movieDetail}>
                            { this.state.movieInfo.revenue > 0 ? numeral(this.state.movieInfo.revenue).format('($ 0 a)') : 'N/A' }
                        </Text>  
                        <Text style={styles.movieDetailSubtitle}>
                            Runtime
                        </Text>
                        <Text style={styles.movieDetail}>
                            { this.state.movieInfo.runtime } minutes
                        </Text>
                        <Text style={styles.movieDetailSubtitle}>
                            Status
                        </Text>
                        <Text style={styles.movieDetail}>
                            { this.state.movieInfo.status }
                        </Text>
                    </ScrollView>
                </View>
            </View>
        )
    }
}