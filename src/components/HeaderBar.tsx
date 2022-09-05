import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity,} from "react-native";
import { Header, Icon } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";


interface HeaderBarProps {
 navigation: any;
}
const HeaderBar = (props: HeaderBarProps) => {
  return (
    <View>
      <Header
        ViewComponent={LinearGradient}
        linearGradientProps={{
          colors: ["#F9B500", "#F9B500"],
        }}
        centerComponent={{
          text: "Tìm kiếm sản phẩm",
          style: styles.heading,
        }}
        leftComponent={
          <View>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Icon type="antdesign" name="arrowleft" tvParallaxProperties />
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DDD",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 18,
    color: "black",
    fontFamily: "Oswald-Regular",
    fontWeight: "400",
  },
});