import { StackNavigator } from 'react-navigation'
import HomeScreen from './HomeScreen'
import ListView from './ListView'
import MovieDetail from './MovieDetail'

const NowPlaying = StackNavigator({
  Home: { screen: HomeScreen },
  List: { screen: ListView },
  Detail: { screen: MovieDetail }
})

module.exports = NowPlaying


