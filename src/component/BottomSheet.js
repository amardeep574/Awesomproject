import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Animated, PanResponder } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

export default class DynamicBottomSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 300,  // Initial height of the bottom sheet
      panY: new Animated.Value(0),  // Pan gesture value to detect drag
    };

    this.bottomSheetRef = null;

    // PanResponder for detecting drag gestures
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (e, gestureState) => {
        return gestureState.dy !== 0;  // Detect vertical drag
      },
      onPanResponderMove: (e, gestureState) => {
        // Adjust the height dynamically based on the vertical movement
        const newHeight = this.state.height - gestureState.dy;
        if (newHeight > 100 && newHeight < 600) {  // Limit the height range
          this.setState({ height: newHeight });
        }
      },
      onPanResponderRelease: () => {
        // Reset panResponder position when dragging stops
        Animated.spring(this.state.panY, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      },
    });
  }

  openBottomSheet = () => {
    this.bottomSheetRef.open();
  };

  closeBottomSheet = () => {
    this.bottomSheetRef.close();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={this.openBottomSheet} style={{ marginTop: 50 }}>
          <Text style={{ fontSize: 18, color: 'blue' }}>Open Bottom Sheet</Text>
        </TouchableOpacity>

        <RBSheet
          ref={(ref) => { this.bottomSheetRef = ref; }}
          height={this.state.height}  // Dynamically adjust height
          closeOnPressMask={true}
          customStyles={{
            container: {
              padding: 20,
              backgroundColor: '#fff',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            },
          }}
        >
          <View
            {...this.panResponder.panHandlers}  // Attach panHandlers to the sheet content
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text style={{ fontSize: 22 }}>Drag me to adjust height</Text>
            <Text style={{ fontSize: 18, marginTop: 20 }}>Height: {Math.round(this.state.height)} px</Text>
            <TouchableOpacity onPress={this.closeBottomSheet} style={{ marginTop: 20 }}>
              <Text style={{ color: 'red' }}>Close Bottom Sheet</Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
      </View>
    );
  }
}
