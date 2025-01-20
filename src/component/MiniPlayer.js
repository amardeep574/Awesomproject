import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";
import { colors } from '../colors/Color';

class MiniPlayer extends Component {
  render() {
    const { song, onPlayPause, isPlaying,onPress } = this.props;

    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Image source={song.img} style={styles.image} />
        <View style={styles.songInfo}>
          <Text style={styles.title}>{song.song}</Text>
          <Text style={styles.artist}>{song.singer}</Text>
        </View>
        <TouchableOpacity onPress={onPlayPause}>
          <Icon
            name={isPlaying ? "pausecircle" : "playcircleo"}
            size={30}
            color={colors.White}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.DarkBrown,
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 15,
    height: 70,
    justifyContent: 'space-between',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  songInfo: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    color: colors.White,
    fontSize: 16,
    fontWeight: 'bold',
  },
  artist: {
    color: colors.Grey,
    fontSize: 14,
  },
});

export default MiniPlayer;
