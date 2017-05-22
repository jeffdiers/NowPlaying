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
    marginTop: Dimensions.get('window').height * .12,
  },
  poster: {
    width: itemWidth,
    height: itemHeight,
    marginBottom: 9,
    borderRadius: 4,
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
    justifyContent: 'space-around',
    marginTop: itemHeight + 10
  },
  flipButton: {
    fontSize: 24,
    textAlign: 'center',
    margin: 10,
    color: BrandColor
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
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'left',
    marginLeft: 10,
    marginTop: 10
  },
  overview: {
    fontSize: 12,
    textAlign: 'left',
    marginLeft: 10,
    marginRight: 10
  },
  backdrop: {
    width: itemWidth,
    height: itemHeight * .30,
    borderRadius: 4
  },
  tagline: {
    fontStyle: 'italic',
    fontSize: 12,
    textAlign: 'left',
    marginLeft: 10,
    marginRight: 10,
  },
  moreInfoButton: {
    marginTop: 5
  },
  movieDetailBackdrop: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  movieDetailContainer: {
    flex: 1,
    backgroundColor: 'black',
    opacity: .8,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  movieDetailTitle: {
    fontSize: 25,
    textAlign: 'left',
    margin: 10,
    marginTop: 100,
    color: BrandColor,
    opacity: 1 
  },
  movieDetailSubtitle: {
    fontSize: 25,
    textAlign: 'left',
    margin: 10,
    marginBottom: 0,
    color: BrandColor,
    opacity: 1 
  },
  movieDetailGenre: {
    fontSize: 18,
    textAlign: 'left',
    marginLeft: 10,
    color: BrandColor,
    opacity: 1 
  },
})

module.exports = { styles, sliderWidth, itemWidth, BrandColor }