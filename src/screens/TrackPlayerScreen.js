import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../colors/Color';
import Icon from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { songData } from '../songlist/SongData';
import TrackPlayer, { Capability, State } from 'react-native-track-player';

const { height, width } = Dimensions.get('screen');

export default class TrackPlayerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songId: this.props.route.params?.songId,
            songData: [],
            playingSongId: null, // Track the song that is currently playing
            playerState: State.Stopped, // Track the player state (playing, paused, etc.)
        };
    }

    async componentDidMount() {
        StatusBar.setHidden(true, 'fade');
        await this.loadSongData(this.state.songId);
        await this.setupPlayer();
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.songId !== this.state.songId) {
            console.log('Song ID changed. Resetting TrackPlayer...');
            await this.loadSongData(this.state.songId);
            await this.updatePlayerQueue();
        }
    }

    componentWillUnmount() {
        StatusBar.setHidden(false, 'fade');
    }

    loadSongData = async (songId) => {
        const filterData = songData.filter((song) => song.id === songId);
        console.log("Filtered Song Data:", filterData);
        this.setState({ songData: filterData });
    };

    setupPlayer = async () => {
        const state = await TrackPlayer.getState();
        if (state === State.None || state === State.Stopped) {
            await TrackPlayer.setupPlayer();
            await TrackPlayer.updateOptions({
                capabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.SkipToNext,
                    Capability.SkipToPrevious,
                    Capability.Stop,
                ],
                compactCapabilities: [Capability.Play, Capability.Pause],
            });
            await this.updatePlayerQueue();
        } else {
            console.log("TrackPlayer already set up. Skipping setup.");
            await this.updatePlayerQueue();
        }
    };

    updatePlayerQueue = async () => {
        const { songData } = this.state;
        if (songData.length === 0) return;

        console.log("Resetting player and adding the new song to the queue...");
        await TrackPlayer.reset();
        await TrackPlayer.add(songData);
    };

    playPauseSong = async (songId) => {
        const { playingSongId, playerState } = this.state;
        // console.log("PLayingSongId--->",playingSongId)
        // console.log("PLayerState----->",playerState)

        if (playingSongId === songId && playerState === State.Playing) {
            // If the song is already playing, pause it
            await TrackPlayer.pause();
            this.setState({ playerState: State.Paused });
        } else {
            // If it's a new song, reset the queue and start playing the new song
            if (playingSongId !== songId) {
                this.setState({ playingSongId: songId });
                await TrackPlayer.reset();
                await TrackPlayer.add(songData.filter(song => song.id === songId));
            }
            // Play the song
            await TrackPlayer.play();
            this.setState({ playerState: State.Playing });
        }
    };

    renderSongItem = ({ item }) => {
        // console.log("ITEM------>",item)
        const { playingSongId, playerState } = this.state;
        const isPlaying = playingSongId === item.id && playerState === State.Playing;

        return (
            <TouchableOpacity style={styles.songItem} onPress={() => this.playPauseSong(item.id)}>
                <Image source={item.img} style={styles.songImage} />
                <View style={styles.songInfo}>
                    <Text style={styles.songTitle}>{item.song}</Text>
                    <Text style={styles.songSinger}>{item.singer}</Text>
                </View>
                <View style={styles.playButton}>
                    <Icon 
                        name={isPlaying ? "pausecircle" : "play"} 
                        size={20} 
                        color={colors.Grey} 
                    />
                </View>
            </TouchableOpacity>
        );
    };

    render() {
        return (
            <LinearGradient
                colors={[colors.Orange, colors.LightBrown, colors.DarkBrown, colors.Black]}
                style={{ flex: 1 }}
            >
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
                    data={this.state.songData}
                    renderItem={this.renderSongItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.songListContainer}
                />
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
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
        padding: 10,
    },
    songListContainer: {
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    searchBoxContainer: {
        marginTop: 10,
        width: width * 0.70,
        height: height * 0.05,
        backgroundColor: colors.Primary,
        borderRadius: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
        marginHorizontal: 20
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
        marginLeft: 5
    },
});
