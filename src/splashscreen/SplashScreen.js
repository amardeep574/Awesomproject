import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';


class SplashScreen extends Component {

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('TabNavigation');
        }, 2000);
    }

    componentWillUnmount() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {/* <Text style={styles.heading}>Splash Screen</Text> */}
                <Image source={require('../images/music_logo.png')} resizeMode='contain'  style={{width:'70%',height:'40%'}}/>
            </View>
        );
    }
}

export default SplashScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9b59b6'
    },
    heading: {
        fontSize: 28,
        fontWeight: '700',
        color: '#FFFFFF',
    }

});