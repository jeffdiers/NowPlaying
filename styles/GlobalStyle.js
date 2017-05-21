import {
  StyleSheet,
  Dimensions
} from 'react-native'

const BrandColor = '#48BF84'

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
    backgroundColor: 'transparent'
  },
  containerHome: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'transparent'
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
    marginTop: Dimensions.get('window').height * .12
  },
  poster: {
    width: itemWidth,
    height: itemHeight,
    marginBottom: 9,
    borderRadius: 4
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
    marginLeft: 12,
    marginTop: Dimensions.get('window').height * .6
  },
  flipSide: {
    width: itemWidth,
    height: itemHeight,
    marginBottom: 9,
    backgroundColor: '#EFE9F4',
    borderRadius: 4
  },
  title: {
    fontSize: 22,
    textAlign: 'left',
    margin: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'left',
    marginLeft: 10,
  },
  overview: {
    fontSize: 12,
    textAlign: 'left',
    marginLeft: 10,
    marginRight: 10
  },
  backdrop: {
    width: itemWidth,
    height: 150,
    borderRadius: 4
  }
})

module.exports = { styles, sliderWidth, itemWidth, BrandColor }