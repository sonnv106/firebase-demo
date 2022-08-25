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
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

const windowWidth = Dimensions.get("window").width;

import { Header, Icon } from "react-native-elements";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import AllProductsScreen from "./AllProductsScreen";
import BeveragesScreen from "./BeveragesScreen";
import CondimentsScreen from "./CondimentsScreen";
const renderScene = SceneMap({
  all: AllProductsScreen,
  beverages: BeveragesScreen,
  condiments: CondimentsScreen,
});

const LazyPlaceholder = ({ route }) => {
  return (
    <View
      style={{
        backgroundColor: "blue",
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{`Waiting for minutes `}</Text>
    </View>
  );
};
const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: "white" }}
    style={{ backgroundColor: "pink" }}
  />
);

const HomeScreen = ({ navigation }) => {
  const [index, setIndex] = React.useState(1);
  const [routes] = React.useState([
    { key: "all", title: "Tất cả sản phẩm" },
    { key: "beverages", title: "Đồ uống" },
    { key: "condiments", title: "Gia vị" },
  ]);

  const onRenderTabBar = (props) => {
    return (
      <View style={styles.tabBar}>
        <ScrollView
          horizontal
          style={{ height: "100%", width: "100%" }}
          contentContainerStyle={{
            paddingVertical: 10,
            width: "100%",
          }}
        >
          {props.navigationState.routes.map((route, i) => {
            return (
              <Pressable
                onPress={() => setIndex(i)}
                key={i}
                style={[
                  styles.btnTab,
                  {
                    borderWidth: index === i ? 0.5 : 0,
                    backgroundColor: index === i ? "#F9B500" : "#FFF",
                    borderColor: "#F9B500",
                  },
                ]}
              >
                <View style={[styles.viewTxtBtnTabs]}>
                  <Text>{route.title}</Text>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <Header
        ViewComponent={LinearGradient}
        linearGradientProps={{
          colors: ["#F9B500", "#F9B500"],
        }}
        centerComponent={{
          text: "Danh sách sản phẩm",
          style: styles.heading,
        }}
        leftComponent={
          <View>
            {/* <Icon type="antdesign" name="home" color="white" /> */}
          </View>
        }
        rightComponent={
          <TouchableOpacity onPress={() => navigation.navigate("SearchScreen")}>
            <Icon type="antdesign" name="search1" />
          </TouchableOpacity>
        }
      />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: windowWidth }}
        renderTabBar={(props) => onRenderTabBar(props)}
        lazy
        renderLazyPlaceholder={({ route }) => {
          return <LazyPlaceholder route={route} />;
        }}
        
      />
      {/* <FlatList
        data={products}
        renderItem={renderItem}
        style={styles.flatlist}
        horizontal={false}
        numColumns={2}
        contentContainerStyle={styles.contentContainerStyle}
        columnWrapperStyle={styles.columnWrapperStyle}
      /> */}
    </View>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth
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
