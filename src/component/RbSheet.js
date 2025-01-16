import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

export default class RbSheet extends Component {
  // Open the bottom sheet
  openBottomSheet = () => {
    this.bottomSheetRef.open();
  };

  // Close the bottom sheet
  closeBottomSheet = () => {
    this.bottomSheetRef.close();
  };

  render() {
    return (
      <RBSheet
        ref={(ref) => { this.bottomSheetRef = ref; }}
        height={850}  // Set the initial height of the bottom sheet
        closeOnPressMask={true}
        customStyles={{
          container: {
            padding: 20,
            backgroundColor: '#fff',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
      >
        <View style={styles.sheetContent}>
          <Text style={styles.sheetHeader}>This is the Bottom Sheet</Text>
          <TouchableOpacity onPress={this.closeBottomSheet} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    );
  }
}

const styles = StyleSheet.create({
  sheetContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  sheetHeader: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#12CBC4',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
