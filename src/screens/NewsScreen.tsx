import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Alert,
  Platform,
  Keyboard,
  Animated,
  KeyboardEventListener,
} from "react-native";
import messaging from "@react-native-firebase/messaging";

import axios from "axios";
import { useKeyboardVisible } from "../utils/useKeyboardVisible";
import { useKeyboardHeight } from "../utils/useKeyboardHeight";

const NewsScreen = ({ navigation }) => {
  const flatListRef = useRef();
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const keyboardHeight = useRef(new Animated.Value(0)).current
  const screenHeight = useRef(new Animated.Value(0)).current
  const isKeyboardShow = useKeyboardVisible()
  const keyboardHeightX = useKeyboardHeight()
  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log("token", fcmToken);
    }
  };
  useEffect(() => {
    const getData = async () => {
      let data = await axios.get(
        "https://jsonplaceholder.typicode.com/comments"
      );
      setData(data.data);
    };
    getData();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          padding: 10,
          width: "100%",
          backgroundColor: "#CCC",
          marginTop: 10,
        }}
      >
        <Text>{item.email}</Text>
      </TouchableOpacity>
    );
  };
  const jumpToBottom = () => {
    //@ts-ignore
    flatListRef.current.scrollToOffset({ animated: true, index: 0 });
  };
  const onChangeText = (text: string) => {
    setMessage(text);
  };
  const submit = () => {
    Keyboard.dismiss();
  };
  useEffect(()=>{
    console.log('chay animated', isKeyboardShow)
    if(isKeyboardShow){
      Animated.parallel([
        Animated.timing(keyboardHeight, {
          duration: 300,
          useNativeDriver: false,
          toValue: keyboardHeightX 
        }),
        // Animated.timing(screenHeight, {
        //   duration: 500,
        //   useNativeDriver: false,
        //   toValue: 200
        // })
      ]).start()
    }else{
      Animated.parallel([
        Animated.timing(keyboardHeight, {
          duration: 300,
          useNativeDriver: false,
          toValue: 0
        }),
        // Animated.timing(screenHeight, {
        //   duration: 500,
        //   useNativeDriver: false,
        //   toValue: 200
        // })
      ]).start()
    }
  }, [isKeyboardShow, keyboardHeightX])
  return (
    <View
      style={{ flex: 1 }}
    >
      <Animated.View style={[{ flex: 1 }, {paddingBottom: keyboardHeight}]}>
        <FlatList
          style={{ flex: 1 }}
          data={data}
          renderItem={renderItem}
          inverted
          ref={flatListRef}
          // ListFooterComponent={
          //   <View style={{ backgroundColor: "red", height: 50, width: "100%",top: 0, left: 0, right: 0 }}>
          //     <Text style={{height: '100%'}}>Hello</Text>
          //   </View>
          // }
          ListHeaderComponent={
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
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <TextInput
                  placeholder="Aa"
                  style={{ flex: 1, marginRight: 8 }}
                  onChangeText={onChangeText}
                  value={message}
                />
                <TouchableOpacity>
                  <Image
                    source={require("../assets/images/smiling-face.png")}
                    resizeMode={"cover"}
                    style={{ width: 24, height: 24 }}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={submit}>
                <Image
                  source={require("../assets/images/send-message.png")}
                  resizeMode={"cover"}
                  style={{ width: 24, height: 24, marginLeft: 10 }}
                />
              </TouchableOpacity>
            </View>
          }
        />
        <TouchableOpacity
          style={{
            backgroundColor: "#DDD",
            padding: 20,
            borderRadius: 30,
            width: 20,
            height: 20,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 20,
            right: 20,
            transform: [{ rotate: "90deg" }],
          }}
          onPress={jumpToBottom}
        >
          <Image
            source={require("../assets/images/send-message.png")}
            style={{ width: 12, height: 12, tintColor: "green" }}
          />
        </TouchableOpacity>
        {/* <View
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
              alignItems: "center",
              flex: 1,
            }}
          >
            <TextInput
              placeholder="Aa"
              style={{ flex: 1, marginRight: 8 }}
              onChangeText={onChangeText}
              value={message}
            />
            <TouchableOpacity>
              <Image
                source={require("../assets/images/smiling-face.png")}
                resizeMode={"cover"}
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={submit}>
            <Image
              source={require("../assets/images/send-message.png")}
              resizeMode={"cover"}
              style={{ width: 24, height: 24, marginLeft: 10 }}
            />
          </TouchableOpacity>
        </View> */}
      </Animated.View>
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
