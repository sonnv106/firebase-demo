import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  useWindowDimensions,
  Pressable,
  ScrollView,
  Animated,
  SafeAreaView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

const windowWidth = Dimensions.get("window").width;

import { Accessory, Header, Icon } from "react-native-elements";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AllProductsScreen from "./AllProductsScreen";
import BeveragesScreen from "./BeveragesScreen";
import CondimentsScreen from "./CondimentsScreen";
import CutFlowersScreen from "./CutFlowersScreen";
import FlowerPots from "./FlowerPots";
import DecorativeLeaves from "./DecorativeLeaves";
import SeedScreen from "./SeedScreen";
import AccessoryScreen from "./AccessoryScreen";
import { FlatList } from "react-native-gesture-handler";

const Tab = createMaterialTopTabNavigator();

const MyTabbar = ({ descriptors, navigation, position, state }) => {
  // console.log(descriptors, navigation )
  const inputRange = state.routes.map((_, i) => i);
  const isFocus = state.index;
  const opacity  = position.interpolate({
    inputRange: inputRange,
    outputRange: inputRange.map(i => i === state.index ? 1 : 0)
  })
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "red",
          height: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Animated.FlatList
          data={state.routes}
          horizontal
          showsHorizontalScrollIndicator
          style={{flex: 1}}
          renderItem={({ item, index }) => {
            return (
              <Pressable style={{marginHorizontal: 10}} onPress={()=>{
                console.log('index', index)
              }}>
                <Animated.Text style={{  }}>{item.name}</Animated.Text>
              </Pressable>
            );
          }}
          getItemLayout={(data,index)=>({length: 80, offset: 80 * index,  index})}
        />
      </View>
    </SafeAreaView>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flexDirection: "column", flex: 1 }}>
      {/* <Header/> */}
      <Tab.Navigator
        initialLayout={{ width: Dimensions.get("window").width }}
        screenOptions={{
          swipeEnabled: true,
          tabBarScrollEnabled: true,
          tabBarLabelStyle: { fontSize: 12 },
          tabBarItemStyle: { width: 100 },
          tabBarStyle: { backgroundColor: "powderblue" },
        }}
        tabBar={(props) => <MyTabbar {...props} />}
      >
        <Tab.Screen name="CutFlowers" component={CutFlowersScreen} />
        <Tab.Screen name="FlowerPots" component={FlowerPots} />
        <Tab.Screen name="DecorativeLeaves" component={DecorativeLeaves} />
        <Tab.Screen name="Seed" component={SeedScreen} />
        <Tab.Screen name="AccessoryScreen" component={AccessoryScreen} />
      </Tab.Navigator>
    </View>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    // alignItems: "center",
    // justifyContent: "center",
  },

  itemProduct: {
    justifyContent: "center",
    flexDirection: "column",
    width: (windowWidth - 36) / 2,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    elevation: 1,
    shadowOffset: {
      height: 0,
      width: 2,
    },
    shadowRadius: 5,
    backgroundColor: "#FFF",
    margin: 6,
    borderRadius: 8,
    padding: 10,
  },
  heading: {
    fontSize: 18,
    color: "black",
    fontFamily: "Oswald-Regular",
    fontWeight: "400",
  },
  tabBar: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",

    borderBottomWidth: 0.6,
    borderBottomColor: "#DDD",
    shadowColor: "#FFF", // màu bóng
    shadowOffset: {
      width: 0,
      height: 1,
    }, //độ lệch bóng ios
    shadowOpacity: 0.25, //độ mờ của bóng ios
    shadowRadius: 5, // bán kính bóng mờ ios
    elevation: 5, //
    backgroundColor: "#FFF",
    width: "100%",
  },
  btnTab: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    borderRadius: 30,
    shadowColor: "#000", // màu bóng
    shadowOffset: {
      width: 0,
      height: 1,
    }, //độ lệch bóng ios
    shadowOpacity: 0.25, //độ mờ của bóng ios
    shadowRadius: 5, // bán kính bóng mờ ios
    elevation: 2, //
    marginHorizontal: 5,
    width: 100,
  },
  txtBtnTab: {},
  viewTxtBtnTabs: {
    flex: 1,
    width: "100%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
