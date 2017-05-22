import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar,
  Image,
  Linking,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import { styles, BrandColor } from '../styles/GlobalStyle'
import numeral from 'numeral'

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'More Info',
    headerStyle:{ position: 'absolute', borderBottomColor: BrandColor, borderBottomWidth: .25, backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0 },
    headerTintColor: BrandColor
  }

  constructor(props) {
      super(props)
  }

  render() {
    const { params } = this.props.navigation.state
    const genres = params.movieInfo.genres.map((genre, index) => { return <Text key={index} style={styles.movieDetailGenre}>{genre.name}</Text> })
    const production_companies = params.movieInfo.production_companies.map((production_companies, index) => { return <Text key={index} style={styles.movieDetailGenre}>{production_companies.name}</Text> })
    console.log(typeof(params.movieInfo.revenue))
    return (
        <Image
            style={ styles.movieDetailBackdrop }
            source={{ uri: 'https://image.tmdb.org/t/p/w1000/' + params.movieInfo.backdrop_path + '' }}
            >
            <View style={ styles.movieDetailContainer }>
                <ScrollView
                        ref={(scrollView) => { _scrollView = scrollView; }}
                        automaticallyAdjustContentInsets={false}
                        onScroll={() => { console.log('onScroll!'); }}
                        scrollEventThrottle={200}
                        style={styles.scrollView}>
                    <Text style={styles.movieDetailTitle}>
                        { params.movieInfo.title }
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
                        Budget
                    </Text>
                    <Text style={styles.movieDetailGenre}>
                        { params.movieInfo.budget > 0 ? numeral(params.movieInfo.budget).format('($ 0 a)') : 'N/A' }
                    </Text>
                    <Text style={styles.movieDetailSubtitle}>
                        Revenue
                    </Text>  
                    <Text style={styles.movieDetailGenre}>
                        { params.movieInfo.revenue > 0 ? numeral(params.movieInfo.revenue).format('($ 0 a)') : 'N/A' }
                    </Text>  
                    <Text style={styles.movieDetailSubtitle}>
                        Runtime
                    </Text>
                    <Text style={styles.movieDetailGenre}>
                        { params.movieInfo.runtime } minutes
                    </Text>
                    <Text style={styles.movieDetailSubtitle}>
                        Status
                    </Text>
                    <Text style={styles.movieDetailGenre}>
                        { params.movieInfo.status }
                    </Text>
                </ScrollView>
            </View>
        </Image>
    )
  }
}