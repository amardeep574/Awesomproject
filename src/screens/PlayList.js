import React, { Component } from 'react';
import { View, Text, FlatList, Image, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import { songData } from '../songlist/SongData';
import { colors } from '../colors/Color';
import Header from '../component/Header';
import TrackPlayer, { Capability, State } from 'react-native-track-player';

const { height, width } = Dimensions.get('screen');

class PlayList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerState: State.Stopped, // Track the player state (playing, paused, etc.)
        };
    }

     async componentDidMount() {
            try{
            // StatusBar.setHidden(true, 'fade');
          
            // await this.loadSongData(this.state.songId);
         this.setupPlayer();
           
        }catch(eroror){
            console.log("error",eroror)
        }
           
        }

     setupPlayer = async () => {
         
         try {
            await TrackPlayer.setupPlayer();
               const state = await TrackPlayer.getState();
               if (state === State.None || state === State.Stopped) {
           
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
         } catch (error) {
            console.log("erorr",error)
         }
        };

    renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('TrackPlayerScreen', { songId: item.id })}>
                <Image source={item.img} style={styles.image} />
                <Text style={styles.songTitle}>{item.song}</Text>
                <Text style={styles.singer}>{item.singer}</Text>
            </TouchableOpacity>
        </View>
    );

    handleIconPress = () => {
        // You can define the functionality for the icon press here
        console.log('Icon Pressed!');
    };

    render() {
        return (
            <View style={styles.container}>
                {/* Header Component */}
                <Header
                    title="Music App"
                    iconName="left" // You can use any icon here, for example, 'left' for back
                    onIconPress={this.goBack} // The function to handle the back icon press
                />
                <FlatList
                    data={songData} 
                    renderItem={this.renderItem} 
                    keyExtractor={(item) => item.id.toString()} 
                    numColumns={2}
                    columnWrapperStyle={styles.columnWrapper} 
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.Black,
        // paddingTop: 20,
    },
    itemContainer: {
        flex: 1, // Allow the item to take up available space
        marginBottom: 15,
        marginVertical:15,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    image: {
        width: width * 0.4,
        height: height * 0.2,
        borderRadius: 8,
        marginBottom: 10,
    },
    songTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.White,
        textAlign: 'center',
    },
    singer: {
        fontSize: 14,
        textAlign: 'center',
        color: colors.White,
    },
    columnWrapper: {
        justifyContent: 'space-between', // Space between columns
    },
});

export default PlayList;
