import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "./HomeScreen";
import NewsScreen from "./NewsScreen";
import ProfileScreen from "./ProfileScreen";
import AddProduct from "./AddProduct";
import { Icon, } from "react-native-elements";
const Tab = createMaterialBottomTabNavigator();

function BottomTabsNavigator() {
  return (
    <Tab.Navigator
      labeled={true}
      activeColor="white"
      shifting
      inactiveColor="#FFFFFF"
      barStyle={{ backgroundColor: "#F9B500" }}
      initialRouteName= 'Home'
      //shifting có hiển thị nhãn hay không
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return <Icon name="home" type="feather" size={24} color={color} />;
          },
          tabBarColor: '#8E9DCC'
        }}

      />
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return (
              <Icon
                name="newspaper-outline"
                type="ionicon"
                size={24}
                color={color}
              />
            );
          },
          tabBarColor: '#00CC66'
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return (
              <Icon name="person" type="octicon" size={24} color={color} />
            );
          },
          tabBarColor: '#F9B500'
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddProduct}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return (
              <Icon
                name="padding"
                type="
            material-community"
                size={24}
                color={color}
              />
            );
          },
          tabBarColor: '#4E4187',
          
        }}
      />
    </Tab.Navigator>
  );
}
export default BottomTabsNavigator;
