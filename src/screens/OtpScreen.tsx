import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, PermissionsAndroid} from "react-native";
import SmsListener from 'react-native-android-sms-listener'
import { loginUserWithPhoneNumber } from "../redux/api";
import auth from '@react-native-firebase/auth'
import { Icon, Input } from "react-native-elements";
import { User } from "../model/types";
const OtpScreen = ({ navigation, route }) => {
  const [confirm, setConfirm]= useState(null)
  const txtPassword = useRef(null);
  
  useEffect(() => {
    txtPassword.current.focus();
  });
  const [passLength, setPassLength] = useState(0);
  const onChangePassword = (password) => {
    console.log(password)
    if(password.length<=6){
        setPassLength(password.length);
        
    }else{
        return;
    }
  };
 
  async function requestReadSmsPermission() {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
      );
    } catch (err) {}
  }
  useEffect(()=>{
    requestReadSmsPermission
  },[])
  

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", height: 50, alignItems: "center" }}>
        <Text
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: 18,
            fontWeight: "900",
            paddingHorizontal: 16,
          }}
        >
          Phone verification
        </Text>
        <TouchableOpacity
          style={{ padding: 10, position: "absolute", left: 0 }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon type="antdesign" name="arrowleft" tvParallaxProperties />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: 50, 
          paddingHorizontal: 100
        }}
      >
        <TextInput
          style={{
            height: '100%',
            opacity: 100,
            fontSize: 30,
            zIndex: 1,
            position: 'absolute',
            width: '100%',
            backgroundColor: "blue",
          }}
          secureTextEntry
          keyboardType={"number-pad"}
          ref={txtPassword}
          onChangeText={onChangePassword}
          maxLength={6}

        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            zIndex: 2,
            width: "100%",
            height: "100%",
            position: "absolute",
            alignItems: "center",
            backgroundColor: "#FFF",
          }}
        >
          <View
            style={[styles.dot, { backgroundColor: passLength >= 1 ? "#AAA" : "#DDD"}]}
          ></View>
          <View
          style={[styles.dot, { backgroundColor: passLength >= 2 ? "#AAA" : "#DDD"}]}
          ></View>
          <View
          style={[styles.dot, { backgroundColor: passLength >= 3 ? "#AAA" : "#DDD"}]}
          ></View>
          <View
          style={[styles.dot, { backgroundColor: passLength >= 4 ? "#AAA" : "#DDD"}]}
          ></View>
          <View
           style={[styles.dot, { backgroundColor: passLength >= 5 ? "#AAA" : "#DDD"}]}
          ></View>
          <View
           style={[styles.dot, { backgroundColor: passLength >= 6 ? "#AAA" : "#DDD"}]}
          ></View>
        </View>
      </View>
    </View>
  );
};

export default OtpScreen;
const styles = StyleSheet.create({
  dot: {
    height: 20,
    width: 20,
    borderRadius: 20,
    
  }
})