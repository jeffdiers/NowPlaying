# Now Playing

This is a take home exercise for informu.

## Instructions

1. Compile to both iOS and Android. 
2. Access the movie db API (https://www.themoviedb.org/documentation/api) and pull any collection of movies (top rated, upcoming etc.), the choice is yours. 
3. Render a ListView component displaying the thumbnail of the movie picture, the title, the creators, and the main actors (you can cap that amount of actors to 2 or 3 if you want). 
4. The component can have as many items as you please. The more items you can pull, the better (keeping performance in mind)! 
5. Each cell in the ListView should be able to render a new view with all details of the movie once clicked, let’s call this new view MovieView. What you render inside this component is up to you, but it’s your chance to show us your skills. Display any data you choose of the given movie, and feel free to add visual styling and other cool things. 
6. You may use any library or tool of you choosing as long as it is open source.

## Setup Virtual Devices
You'll need react native's command line tools
```
$ npm install -g react-native-cli
```
### Xcode
Install Xcode (this will take awhile):
<br />
https://developer.apple.com/xcode/downloads/
<br />
Install the Xcode Command Line Tools:
<br />
Xcode -> Preferences... -> Locations -> Command Line Tools: Xcode 8.2.1 (8C1002)
```
$ cd NowPlaying
$ react-native run-ios
```
### Android
Follow these guides to install Android SDK (this also takes awhile)
<br />
https://facebook.github.io/react-native/releases/0.23/docs/android-setup.html <br />
https://facebook.github.io/react-native/docs/getting-started.html
```
$ cd NowPlaying
$ react-native run-android
```