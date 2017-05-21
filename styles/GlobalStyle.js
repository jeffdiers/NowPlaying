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
  loadMore: {
    width: itemWidth,
    height: itemHeight,
    marginBottom: 9,
    backgroundColor: 'red'
  },
  ratingContainer: {
    width: Dimensions.get('window').width * .5
  },
  posterDetail: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  infoIcon: {
    alignItems: 'center',
    marginTop: 12,
  }
})

module.exports = { styles, sliderWidth, itemWidth }