import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './TabNavigation';
import SplashScreen from '../splashscreen/SplashScreen';
import { createStackNavigator } from '@react-navigation/stack';
import TrackPlayerScreen from '../screens/TrackPlayerScreen';

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen 
          name="SplashScreen" 
          component={SplashScreen} 
          options={{ headerShown: false }} 
        />
        
        <Stack.Screen 
          name="TabNavigation" 
          component={TabNavigation} 
          options={{ headerShown: false }} 
        />
         <Stack.Screen 
          name="TrackPlayerScreen" 
          component={TrackPlayerScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
