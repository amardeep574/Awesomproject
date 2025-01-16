// import React, { Component } from 'react';
// import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
// import HomeScreen from '../screens/HomeScreen';
// import MapScreen from '../screens/MapScreen';
// import NotificationScreen from '../screens/NotificationScreen';
// import ProfileScreen from '../screens/ProfileScreen';

// const { width, height } = Dimensions.get('screen');

// class Dashboard extends Component {
//     state = {
//         activeTab: 'Home', // Initially, 'Home' tab is active
//     };

//     handleTabPress = (tab) => {
//         this.setState({ activeTab: tab });
//     };

//     render() {
//         const { activeTab } = this.state;

//         return (
//             <View style={styles.container}>
//                 <View style={styles.subContainer}>
//                     <View style={{ flexDirection: 'row', flex: 1 }}>
//                         <TouchableOpacity
//                             style={styles.textContainer}
//                             onPress={() => this.handleTabPress('Home')}
//                         >
//                             <View
//                                 style={[
//                                     styles.textContainerBackground,
//                                     { backgroundColor: activeTab === 'Home' ? '#12CBC4' : '#535c68' },
//                                 ]}
//                             >
//                                 <Text style={styles.home}>Home</Text>
//                             </View>
//                         </TouchableOpacity>

//                         <TouchableOpacity
//                             style={styles.textContainer}
//                             onPress={() => this.handleTabPress('Map')}
//                         >
//                             <View
//                                 style={[
//                                     styles.textContainerBackground,
//                                     { backgroundColor: activeTab === 'Map' ? '#12CBC4' : '#535c68' },
//                                 ]}
//                             >
//                                 <Text style={styles.home}>Map</Text>
//                             </View>
//                         </TouchableOpacity>

//                         <TouchableOpacity
//                             style={styles.textContainer}
//                             onPress={() => this.handleTabPress('Notification')}
//                         >
//                             <View
//                                 style={[
//                                     styles.textContainerBackground,
//                                     { backgroundColor: activeTab === 'Notification' ? '#12CBC4' : '#535c68' },
//                                 ]}
//                             >
//                                 <Text style={styles.home}>Notification</Text>
//                             </View>
//                         </TouchableOpacity>

//                         <TouchableOpacity
//                             style={styles.textContainer}
//                             onPress={() => this.handleTabPress('Profile')}
//                         >
//                             <View
//                                 style={[
//                                     styles.textContainerBackground,
//                                     { backgroundColor: activeTab === 'Profile' ? '#12CBC4' : '#535c68' },
//                                 ]}
//                             >
//                                 <Text style={styles.home}>Profile</Text>
//                             </View>
//                         </TouchableOpacity>
//                     </View>
//                 </View>

//                 {/* Render the active screen */}
//                 <View style={{ flex: 1 }}>
//                     {activeTab === 'Home' && <HomeScreen />}
//                     {activeTab === 'Map' && <MapScreen />}
//                     {activeTab === 'Notification' && <NotificationScreen />}
//                     {activeTab === 'Profile' && <ProfileScreen />}
//                 </View>
//             </View>

//         );
//     }
// }

// export default Dashboard;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     subContainer: {
//         width: width,
//         backgroundColor: '#000000',
//         height: height * 0.08,
//     },
//     home: {
//         color: '#000000',
//         fontSize: 15,
//         fontWeight: '400',
//         textAlign: 'center',
//     },
//     textContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     textContainerBackground: {
//         width: width * 0.23,
//         backgroundColor: '#12CBC4', // Default background color
//         borderRadius: 7,
//         padding: 5,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
// });
import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> Dashboard </Text>
      </View>
    );
  }
}

export default Dashboard;
