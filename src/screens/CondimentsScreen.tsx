import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CondimentsScreen = () => {

  return (
    <View style={styles.container}>
      <Text>CondimentsScreen screen</Text>
    </View>
  );
};
export default CondimentsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
