import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';  // Import geolocation


class MapScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: 37.78825,  // Default latitude (San Francisco)
        longitude: -122.4324,  // Default longitude
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      currentLocation: null,  // To hold the current location data
    };
  }

  componentDidMount() {
    // Get current location when the component mounts using Geolocation
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        this.setState({
          region: {
            ...this.state.region,
            latitude,
            longitude,
          },
          currentLocation: { latitude, longitude },
        });
      },
      error => alert(error.message), // Handle errors if location is not found
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.currentLocation ? (
          <MapView
            style={styles.map}
            region={this.state.region}
            showsUserLocation={true} // Show user's current location
          >
            <Marker
              
              coordinate={{
                latitude: this.state.region.latitude,
                longitude: this.state.region.longitude,
              }}
              title="My Marker"
              description="This is a description for the marker"
            />
          </MapView>
          
        ) : (
          <Text>Loading current location...</Text> // Display loading message until location is available
        )}
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject, // Map should take the full screen
  },
});

export default MapScreen;
