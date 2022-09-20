import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import messaging from "@react-native-firebase/messaging";
const NewsScreen = ({ navigation }) => {
  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log("token", fcmToken);
    }
  };
  useEffect(() => {}, []);
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <FlatList style={{ flex: 1, backgroundColor: "blue" }} />

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              borderColor: "#AAA",
              borderWidth: 1,
              borderRadius: 32,
              padding: 8,
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
            }}
          >
            <TextInput placeholder="Aa" style={{ flex: 1, marginRight: 8 }} />
            <TouchableOpacity>
              <Image
                source={require("../assets/images/smiling-face.png")}
                resizeMode={"cover"}
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Image
              source={require("../assets/images/send-message.png")}
              resizeMode={"cover"}
              style={{ width: 24, height: 24, marginLeft: 10 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
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
