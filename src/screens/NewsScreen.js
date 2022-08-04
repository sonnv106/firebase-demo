import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import messaging from "@react-native-firebase/messaging";
const NewsScreen = () => {
  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log("token", fcmToken);
    }
  };
  useEffect(() => {
    checkToken();
    return()=>{
        checkToken()
    }
  },[]);
  return (
    <View>
      <Text>New screen</Text>
    </View>
  );
};
export default NewsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DDD",
    alignItems: "center",
    justifyContent: "center",
  },
});
