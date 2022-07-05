import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Header, Icon } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
const SearchScreen = ({ navigation }) => {
  return (
    <View>
      <Header
       ViewComponent={LinearGradient}
        linearGradientProps={{
          colors: ["#F9B500", "#F9B500"],
        }}
        centerComponent={{
          text: "Tìm kiếm sản phẩm",
          style: styles.heading
        }}
        leftComponent={
          <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon type="antdesign" name="arrowleft" />
            </TouchableOpacity>
          </View>
        }
       
      />
    </View>
  );
};
export default SearchScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DDD",
    alignItems: "center",
    justifyContent: "center",
  },
  heading:{
    fontSize: 18,
    color: "black",
    fontFamily: "Oswald-Regular",
    fontWeight: "400",
  },
});
