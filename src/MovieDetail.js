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
  ScrollView,
  findNodeHandle
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import { styles, BrandColor } from '../styles/GlobalStyle'
import numeral from 'numeral'
import { BlurView } from 'react-native-blur';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'More Info',
    headerStyle:{ position: 'absolute', borderBottomColor: BrandColor, borderBottomWidth: .25, backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0 },
    headerTintColor: BrandColor
  }

  constructor(props) {
      super(props)
      this.state = { viewRef: null };
  }

  imageLoaded() {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  }

  render() {
    const { params } = this.props.navigation.state
    const genres = params.movieInfo.genres.map((genre, index) => { return <Text key={index} style={styles.movieDetail}>{genre.name}</Text> })
    const production_companies = params.movieInfo.production_companies.map((production_companies, index) => { return <Text key={index} style={styles.movieDetail}>{production_companies.name}</Text> })
    console.log('scroll view ', params.movieInfo)
    return (
      <View style={styles.container}>
        <Image
          ref={(img) => { this.backgroundImage = img; }}
          source={{ uri: 'https://image.tmdb.org/t/p/w1000/' + params.movieInfo.backdrop_path + '' }}
          style={styles.absolute}
          onLoadEnd={this.imageLoaded.bind(this)}
        />
        <BlurView
          style={styles.absolute}
          viewRef={this.state.viewRef}
          blurType="dark"
          blurAmount={10}
        />
        <View style={{backgroundColor: 'transparent'}}>
            <ScrollView
                    ref={(scrollView) => { _scrollView = scrollView; }}
                    automaticallyAdjustContentInsets={false}
                    onScroll={() => { console.log('onScroll!'); }}
                    scrollEventThrottle={200}
                    style={styles.scrollView}>
                <Text style={styles.movieDetailTitle}>
                    { params.movieInfo.title }
                </Text>
                <Text style={ styles.movieDetailSubtitle }>
                    Overview
                </Text>
                <Text style={ styles.movieDetail }>
                    { params.movieInfo.overview }
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
                <Text style={styles.movieDetail}>
                    { params.movieInfo.budget > 0 ? numeral(params.movieInfo.budget).format('($ 0 a)') : 'N/A' }
                </Text>
                <Text style={styles.movieDetailSubtitle}>
                    Revenue
                </Text>  
                <Text style={styles.movieDetail}>
                    { params.movieInfo.revenue > 0 ? numeral(params.movieInfo.revenue).format('($ 0 a)') : 'N/A' }
                </Text>  
                <Text style={styles.movieDetailSubtitle}>
                    Runtime
                </Text>
                <Text style={styles.movieDetail}>
                    { params.movieInfo.runtime } minutes
                </Text>
                <Text style={styles.movieDetailSubtitle}>
                    Status
                </Text>
                <Text style={styles.movieDetail}>
                    { params.movieInfo.status }
                </Text>
            </ScrollView>
        </View>
      </View>
    )
  }
}


                    {/*<ScrollView
                            ref={(scrollView) => { _scrollView = scrollView; }}
                            automaticallyAdjustContentInsets={false}
                            onScroll={() => { console.log('onScroll!'); }}
                            scrollEventThrottle={200}
                            style={styles.scrollView}>
                        <Text style={styles.movieDetailTitle}>
                            { params.movieInfo.title }
                        </Text>
                        <Text style={ styles.movieDetailSubtitle }>
                            Overview
                        </Text>
                        <Text style={ styles.movieDetail }>
                            { params.movieInfo.overview }
                        </Text>
                        <Text style={styles.movieDetail}>
                            Genres
                        </Text>
                        { genres }
                        <Text style={styles.movieDetail}>
                            Production Companies
                        </Text>
                        { production_companies }
                        <Text style={styles.movieDetail}>
                            Budget
                        </Text>
                        <Text style={styles.movieDetail}>
                            { params.movieInfo.budget > 0 ? numeral(params.movieInfo.budget).format('($ 0 a)') : 'N/A' }
                        </Text>
                        <Text style={styles.movieDetail}>
                            Revenue
                        </Text>  
                        <Text style={styles.movieDetail}>
                            { params.movieInfo.revenue > 0 ? numeral(params.movieInfo.revenue).format('($ 0 a)') : 'N/A' }
                        </Text>  
                        <Text style={styles.movieDetail}>
                            Runtime
                        </Text>
                        <Text style={styles.movieDetail}>
                            { params.movieInfo.runtime } minutes
                        </Text>
                        <Text style={styles.movieDetailSubtitle}>
                            Status
                        </Text>
                        <Text style={styles.movieDetail}>
                            { params.movieInfo.status }
                        </Text>
                    </ScrollView>*/}