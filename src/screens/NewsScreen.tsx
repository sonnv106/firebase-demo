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
} from "react-native";
import messaging from "@react-native-firebase/messaging";
import axios from "axios";

const NewsScreen = ({ navigation }) => {
  const flatListRef = useRef()
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('')
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
          borderWidth: 1,
          borderColor: "red",
        }}
      >
        <Text>{item.email}</Text>
      </TouchableOpacity>
    );
  };
  const jumpToBottom = ()=>{
    //@ts-ignore
    flatListRef.current.scrollToIndex({animated: true, index: 0})
  }
  const onChangeText = (text: string)=>{
    setMessage(text)
  }
  const submit = ()=>{
    
  }
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1, backgroundColor: "blue" }}
          data={data}
          renderItem={renderItem}
          inverted
          ref={flatListRef}
          
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
            position: 'absolute',
            bottom: 50,
            right: 20
          }}
          onPress={jumpToBottom}
        >
          <Image
            source={require("../assets/images/send-message.png")}
            style={{ width: 12, height: 12, tintColor: "green" }}
          />
        </TouchableOpacity>
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
            <TextInput placeholder="Aa" style={{ flex: 1, marginRight: 8 }} onChangeText={onChangeText} value={message}/>
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
