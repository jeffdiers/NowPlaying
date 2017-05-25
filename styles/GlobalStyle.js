import { StyleSheet, Dimensions } from 'react-native'

const BrandColor = '#48BF84'
const BrandColorDark = '#171D1C'
const BrandColorLight = '#EFE9F4'

const cardBorder = 6

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
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  containerWelcome: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BrandColorDark
  },
  welcomeTitle: {
    fontSize: 30,
    color: BrandColor,
    marginTop: 6
  },
  welcomeText: {
    fontSize: 18,
    color: BrandColor,
    textAlign: 'center',
    margin: 10
  },
  welcomeButton: {
    borderRadius: 6,
    borderWidth: 2,
    marginTop: 30,
    borderColor: BrandColor,
  },
  welcomeButtonText: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    color: BrandColor,
    fontSize: 18
  },
  containerBlur: {
    justifyContent: 'center',
    alignItems: 'center',
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
    borderRadius: cardBorder,
  },
  infoCircle: {
    margin: 10,
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
    backgroundColor: BrandColorLight,
    borderRadius: cardBorder,
  },
  flipSideContent: {
    width: itemWidth,
    height: itemHeight,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  moviePosterBackCover: {
    top: -4,
    backgroundColor: BrandColorLight
  },
  title: {
    fontSize: 18,
    textAlign: 'left',
    marginTop: 3,
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
    color: BrandColorDark,
    fontSize: 15,
    textAlign: 'left',
    marginTop: 25,
    marginLeft: 10,
    marginRight: 10
  },
  backdrop: {
    width: itemWidth,
    height: itemHeight * .35,
    borderRadius: cardBorder,
  },
  genres: {
    color: BrandColorDark,
    fontStyle: 'italic',
    fontSize: 12,
    textAlign: 'left',
    marginLeft: 10,
    marginRight: 10,
  },
  moreInfoButton: {
    marginBottom: 10,
    borderTopWidth: .5,
    borderTopColor: 'grey',
    paddingTop: 5
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
  movieDetail: {
    fontSize: 18,
    textAlign: 'left',
    marginLeft: 10,
    marginRight: 10,
    color: BrandColor,
    opacity: 1 
  },
  absolute: {
    position: "absolute",
    top: 0, left: 0, bottom: 0, right: 0,
  },
})

module.exports = { styles, sliderWidth, itemWidth, BrandColor, BrandColorDark }