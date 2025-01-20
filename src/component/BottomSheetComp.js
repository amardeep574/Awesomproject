import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';  // For bottom sheet
import Icon from 'react-native-vector-icons/AntDesign'; // Cross icon from AntDesign
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient
import { colors } from '../colors/Color'; // Ensure you have colors defined

const { height, width } = Dimensions.get('screen');

class BottomSheetComp extends Component {
  constructor(props) {
    super(props);
    this.RBSheet = React.createRef(); // Create a ref for RBSheet
  }

  // Method to open the bottom sheet
  open = () => {
    this.RBSheet.current.open();
  };

  // Method to close the bottom sheet
  close = () => {
    this.RBSheet.current.close();
  };

  render() {
    return (
      <RBSheet
        ref={this.RBSheet}
        height={height} // Set height to a portion of the screen height
        customStyles={{
          container: {
            // Use LinearGradient as the background for the BottomSheet container
            backgroundColor: 'transparent',  // Make container transparent so gradient can be seen
            // borderTopLeftRadius: 20,  // Optional: round the corners of the bottom sheet
            // borderTopRightRadius: 20,  // Optional: round the corners of the bottom sheet
          },
        }}
      >
        {/* Apply Linear Gradient Background */}
        <LinearGradient
          colors={[colors.DarkBrown, colors.Green,colors.Primary]}  // Define gradient colors here
          style={styles.gradientContainer}
        >
          {/* Close Icon (down arrow) in the top-right corner */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={this.close} // Close the bottom sheet when clicked
          >
            <Icon name="down" size={30} color={colors.White} />
          </TouchableOpacity>

          {/* Render the dynamic content */}
          {this.props.content}
        </LinearGradient>
      </RBSheet>
    );
  }
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingTop: 20,  // Adjust the padding if needed
  },
  closeButton: {
    position: 'absolute', // Position the button at the top-right corner
    top: 10,  // 10 units from the top
    right: 0,  // 10 units from the right edge
    left:10,
    padding: 10,  // Add some padding to make the button clickable
  },
});

export default BottomSheetComp;
