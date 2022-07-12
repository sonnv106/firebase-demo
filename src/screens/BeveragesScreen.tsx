import React from "react";
import { View, Text, StyleSheet } from "react-native";

const BeveragesScreen = () => {
  return (
    <View style={styles.container}>
      <Text>BeveragesScreen screen</Text>
    </View>
  );
};
export default BeveragesScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
