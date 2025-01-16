import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/Ionicons"
// import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PlayList from '../screens/PlayList';
// import TrackPLayerScreen from "../screens/TrackPlayerScreen"
const Tab = createBottomTabNavigator();

class TabNavigation extends Component {
  render() {
    return (
      <Tab.Navigator>
        
        <Tab.Screen
          name="PlayList"
          component={PlayList}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" size={size} color={color} />
            ),
          }}
        />
     
        <Tab.Screen
          name="MapScreen"
          component={MapScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name="map" size={size} color={color} />
            ),
          }}
        />
        {/* Notification Screen */}
        <Tab.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name="notifications" size={size} color={color} />
            ),
          }}
        />
        {/* Profile Screen */}
        <Tab.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name="person" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default TabNavigation;
