import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet'; // Import the RBSheet component

class BottomSheetComp extends Component {
  constructor(props) {
    super(props);
    this.RBSheet = React.createRef(); // Create a ref for RBSheet
  }

  // Expose open and close methods to the parent component via ref
  open = () => {
    this.RBSheet.current.open(); // Use the ref to call the open() method
  };

  close = () => {
    this.RBSheet.current.close(); // Use the ref to call the close() method
  };

  render() {
    const { data } = this.props; // Get data passed from the parent component

    return (
      <RBSheet
        ref={this.RBSheet}
        height={200}
        // openDuration={250} // Animation duration for opening
        // closeDuration={250} // Animation duration for closing
        customStyles={{
          container: {
            justifyContent: 'flex-start', // Align content to the top
            alignItems: 'center', // Center items horizontally
            // paddingTop: 20, 
          },
        }}
      >
        <View style={styles.sheetContainer}>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={this.close}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>


          <View style={styles.contentContainer}>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.description}>{data.description}</Text>
          </View>
        </View>
      </RBSheet>
    );
  }
}

const styles = StyleSheet.create({
  // Main container inside RBSheet for all content
  sheetContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20, // Add some padding around
  },
  // Close button at the top-right of the sheet
  closeButton: {
    position: 'absolute',
    top: 10,  // Position 10 units from top
    right: 20, // Position 20 units from right edge
    padding: 10,  // Add padding around the button
  },
  closeButtonText: {
    color: 'grey', // Set color to grey for the text
    fontSize: 16,  // Adjust font size as needed
  },
  // Content container for title and description
  contentContainer: {
    marginTop: 40,  // Add some space from the top
    alignItems: 'center',  // Center the content horizontally
    paddingVertical: 20,  // Add vertical padding
  },
  title: {
    fontSize: 18,  // Title font size
    fontWeight: 'bold',  // Bold font for the title
    marginBottom: 10, // Margin to separate title and description
  },
  description: {
    fontSize: 14,  // Smaller font size for description
    textAlign: 'center',  // Center-align the description
    color: 'grey',  // Grey color for the description
  },
});

export default BottomSheetComp;
