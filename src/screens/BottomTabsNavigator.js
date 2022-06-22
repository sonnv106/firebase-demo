import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from './HomeScreen'
import NewsScreen from './NewsScreen'
import ProfileScreen from './ProfileScreen';
const Tab = createMaterialBottomTabNavigator();

function BottomTabsNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="News" component={NewsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
export default BottomTabsNavigator;