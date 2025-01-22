import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../colors/Color';
import Icon from 'react-native-vector-icons/AntDesign';
import { songData } from '../songlist/SongData';
import TrackPlayer, { State } from 'react-native-track-player';
import MiniPlayer from '../component/MiniPlayer'; // Import the MiniPlayer
import BottomSheetComp from '../component/BottomSheetComp';
import Slider from '@react-native-community/slider'; // Import Slider

const { height, width } = Dimensions.get('screen');

export default class TrackPlayerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songId: this.props.route.params?.songId,
      songData: [],
      playingSongId: null, // Track the song that is currently playing
      playerState: State.Stopped, // Track the player state (playing, paused, etc.)
      currentPosition: 0, // Current position of the song
      duration: 0, // Duration of the song
    };
    this.bottomSheetRef = React.createRef();
  }

  async componentDidMount() {
    try {
      this.loadSongData(this.state.songId);
      this.setupTrackPlayer();
    } catch (error) {
      console.log('error', error);
    }
  }

  loadSongData = async (songId) => {
    const filterData = songData.filter((song) => song.id === songId);
    this.setState({ songData: filterData });
  };

  setupTrackPlayer = async () => {
    // Initialize the player with the current song
    const position = await TrackPlayer.getPosition();
    const duration = await TrackPlayer.getDuration();
    this.setState({ currentPosition: position, duration });

    // Update the position periodically while the song is playing
    this.positionInterval = setInterval(async () => {
      const position = await TrackPlayer.getPosition();
      this.setState({ currentPosition: position });
    }, 1000); // Update every second
  };

  componentWillUnmount() {
    // Cleanup interval when the component unmounts
    if (this.positionInterval) {
      clearInterval(this.positionInterval);
    }
  }

  // Play or Pause song
  playPauseSong = async (songId) => {
    const { playingSongId, playerState } = this.state;

    if (playingSongId === songId && playerState === State.Playing) {
      await TrackPlayer.pause();
      this.setState({ playerState: State.Paused });
    } else {
      if (playingSongId !== songId) {
        this.setState({ playingSongId: songId });
        await TrackPlayer.reset();
        await TrackPlayer.add(songData.filter((song) => song.id === songId));
      }
      await TrackPlayer.play();
      this.setState({ playerState: State.Playing });
    }
  };

  // Seek to a specific position in the song
  handleSliderValueChange = async (value) => {
    await TrackPlayer.seekTo(value);
  };

  openBottomSheet = () => {
    this.bottomSheetRef.current.open();
  };

  // Render BottomSheet Content
  renderBottomSheetContent = () => {
    const { playingSongId, playerState, songData, currentPosition, duration } = this.state;
    const currentSong = songData.find((song) => song.id === playingSongId);

    if (!currentSong) return null; // If no song is playing, return null

    return (
      <View style={styles.bottomSheetContent}>
        <Image source={currentSong.img} style={styles.bottomSheetImage} />
        <Text style={styles.bottomSheetSongTitle}>{currentSong.song}</Text>
        <Text style={styles.bottomSheetSongArtist}>{currentSong.singer}</Text>

        {/* Slider for Song Progress */}
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={currentPosition}
          onValueChange={this.handleSliderValueChange} // Update song position when slider is dragged
          minimumTrackTintColor={colors.White}
          maximumTrackTintColor={colors.Grey}
          thumbTintColor={colors.White}
        />

        {/* Display current time and total time */}
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{this.formatTime(currentPosition)}</Text>
          <Text style={styles.timeText}>{this.formatTime(duration)}</Text>
        </View>

        <View style={styles.bottomSheetControlsContainer}>
          <TouchableOpacity onPress={this.previousSong} style={styles.controlButton}>
            <Icon name="stepbackward" size={35} color={colors.White} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.playPauseSong(currentSong.id)} style={styles.controlButton}>
            <Icon
              name={playerState === State.Playing ? 'pausecircle' : 'playcircleo'}
              size={50}
              color={colors.White}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.nextSong} style={styles.controlButton}>
            <Icon name="stepforward" size={35} color={colors.White} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Format time from seconds
  formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

  // Skip to next song
  nextSong = () => {
    const { playingSongId, songData } = this.state;
    const currentIndex = songData.findIndex((song) => song.id === playingSongId);
    const nextSong = songData[(currentIndex + 1) % songData.length];
    this.setState({ playingSongId: nextSong.id });
    this.playPauseSong(nextSong.id); // Play next song
  };

  // Skip to previous song
  previousSong = () => {
    const { playingSongId, songData } = this.state;
    const currentIndex = songData.findIndex((song) => song.id === playingSongId);
    const prevSong = songData[(currentIndex - 1 + songData.length) % songData.length];
    this.setState({ playingSongId: prevSong.id });
    this.playPauseSong(prevSong.id); // Play previous song
  };

  renderSongItem = ({ item }) => {
    const { playingSongId, playerState } = this.state;
    const isPlaying = playingSongId === item.id && playerState === State.Playing;

    return (
      <TouchableOpacity
        style={styles.songItem}
        onPress={() => this.playPauseSong(item.id)} // Play or Pause song when pressed
      >
        <Image source={item.img} style={styles.songImage} />
        <View style={styles.songInfo}>
          <Text style={styles.songTitle}>{item.song}</Text>
          <Text style={styles.songSinger}>{item.singer}</Text>
        </View>
        <View style={styles.playButton}>
          <Icon
            name={isPlaying ? 'pausecircle' : 'playcircleo'} // Change icon based on play/pause state
            size={30}
            color={colors.Grey}
          />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { songData, playingSongId, playerState } = this.state;
    const currentSong = songData.find((song) => song.id === playingSongId);

    return (
      <LinearGradient colors={[colors.Orange, colors.LightBrown, colors.DarkBrown, colors.Black]} style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Icon name="left" size={30} color={colors.White} style={{ marginTop: 20, marginHorizontal: 15 }} />
        </TouchableOpacity>

        <View style={{ flexDirection: 'row' }}>
          <View style={styles.searchBoxContainer}>
            <Icon name="search1" size={25} style={{ paddingLeft: 10 }} color={colors.White} />
            <Text style={styles.playList}>Find the playlist</Text>
          </View>
          <View style={styles.sortContainer}>
            <Text style={{ textAlign: 'center', color: colors.White, fontWeight: '600', fontSize: 15 }}>Sort</Text>
          </View>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../images/song_img.jpg')}
            style={{ width: width * 0.8, height: height * 0.3, marginTop: 25, borderRadius: 10 }}
            resizeMode="cover"
          />
        </View>

        <FlatList
          data={songData}
          renderItem={this.renderSongItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.songListContainer}
        />

        {/* Mini Player */}
        {currentSong && (
          <MiniPlayer
            song={currentSong}
            onPlayPause={() => this.playPauseSong(currentSong.id)} // Play/Pause handler
            isPlaying={playerState === State.Playing} // Check if song is playing
            onPress={() => this.openBottomSheet()}
          />
        )}

        {/* Bottom Sheet Component */}
        <BottomSheetComp ref={this.bottomSheetRef} content={this.renderBottomSheetContent()} />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  // Styles for the song list item
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: colors.LightBrown,
    borderRadius: 10,
  },
  songImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 15,
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    color: colors.White,
    fontSize: 16,
    fontWeight: '500',
  },
  songSinger: {
    color: colors.Grey,
    fontSize: 14,
  },
  playButton: {
    // padding: 'auto',
    marginRight:10
  },
  songListContainer: {
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  searchBoxContainer: {
    marginTop: 10,
    width: width * 0.7,
    height: height * 0.05,
    backgroundColor: colors.Primary,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    marginHorizontal: 20,
  },
  playList: {
    color: colors.White,
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    textAlign: 'left',
  },
  sortContainer: {
    marginTop: 10,
    width: width * 0.15,
    height: height * 0.05,
    backgroundColor: colors.Primary,
    justifyContent: 'center',
    borderRadius: 3,
    marginLeft: 5,
  },

  // Styles for BottomSheetContent
  bottomSheetContent: {
    alignItems: 'center',
    paddingVertical: 80,
  },
  bottomSheetImage: {
    width: width * 0.8,
    height: height * 0.4,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  bottomSheetSongTitle: {
    color: colors.White,
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
  },
  bottomSheetSongArtist: {
    color: colors.Grey,
    fontSize: 14,
    marginTop: 5,
  },
  bottomSheetControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginTop: 20,
  },
  controlButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: {
    width: '80%',
    marginTop: 15,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 5,
  },
  timeText: {
    color: colors.White,
    fontSize: 12,
  },
});
