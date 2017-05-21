import {
  StyleSheet,
  Dimensions
} from 'react-native'

const horizontalMargin = 20;
const slideWidth = Dimensions.get('window').width - 100;
 
const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = itemWidth * 1.5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  slide: {
    width: itemWidth,
    height: itemHeight + 90,
  },
  poster: {
    width: itemWidth,
    height: itemHeight,
    marginBottom: 9
  },
  ratingContainer: {
    width: 200
  }
})

module.exports = { styles, sliderWidth, itemWidth }