import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PhotosScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Photos screen</Text>
    </View>
  );
};
export default PhotosScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
