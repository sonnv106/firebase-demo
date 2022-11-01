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

const Tab = createMaterialTopTabNavigator();

const MyTabbar = ({ descriptors, navigation, position, state }) => {
  // console.log(position)
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "red",
        height: 50,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };
        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
        });
        
        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              backgroundColor: 'yellow',
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
              margin: 5,
              paddingHorizontal: 5,
            }}
            key={index}
          >
            <Animated.Text style={{  opacity, textAlign: "center" }}>
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
// const renderScene = SceneMap({
//   all: AllProductsScreen,
//   beverages: BeveragesScreen,
//   condiments: CondimentsScreen,
// });

// const LazyPlaceholder = ({ route }) => {
//   return (
//     <View
//       style={{
//         backgroundColor: "blue",
//         flex: 1,
//         width: "100%",
//         height: "100%",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Text>{`Waiting for minutes `}</Text>
//     </View>
//   );
// };
// const renderTabBar = (props) => (
//   <TabBar
//     {...props}
//     indicatorStyle={{ backgroundColor: "white" }}
//     style={{ backgroundColor: "pink" }}
//   />
// );

const HomeScreen = ({ navigation }) => {
  // const [index, setIndex] = React.useState(1);
  // const [routes] = React.useState([
  //   { key: "all", title: "Tất cả sản phẩm" },
  //   { key: "beverages", title: "Đồ uống" },
  //   { key: "condiments", title: "Gia vị" },
  // ]);

  // const onRenderTabBar = (props) => {
  //   return (
  //     <View style={styles.tabBar}>
  //       <ScrollView
  //         horizontal
  //         style={{ height: "100%", width: "100%" }}
  //         contentContainerStyle={{
  //           paddingVertical: 10,
  //           width: "100%",
  //         }}
  //       >
  //         {props.navigationState.routes.map((route, i) => {
  //           return (
  //             <Pressable
  //               onPress={() => setIndex(i)}
  //               key={i}
  //               style={[
  //                 styles.btnTab,
  //                 {
  //                   borderWidth: index === i ? 0.5 : 0,
  //                   backgroundColor: index === i ? "#F9B500" : "#FFF",
  //                   borderColor: "#F9B500",
  //                 },
  //               ]}
  //             >
  //               <View style={[styles.viewTxtBtnTabs]}>
  //                 <Text>{route.title}</Text>
  //               </View>
  //             </Pressable>
  //           );
  //         })}
  //       </ScrollView>
  //     </View>
  //   );
  // };

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
