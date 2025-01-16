import React, { Component } from 'react';
import { View, Button } from 'react-native';
import BottomSheetComp from '../component/BottomSheetComp'; 

class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sheetData: {
        title: 'Sample Title',
        description: 'This is a description of the bottom sheet content.',
      },
    };
  }

  openSheet = () => {
    this.RBSheet.open(); 
  };

  render() {
    const { sheetData } = this.state;

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button title="Open Bottom Sheet" onPress={this.openSheet} /> 

        <BottomSheetComp
          ref={(ref) => { this.RBSheet = ref; }} 
          data={sheetData} 
        />
      </View>
    );
  }
}

export default NotificationScreen;
