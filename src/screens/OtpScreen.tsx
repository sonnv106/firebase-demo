import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, PermissionsAndroid, Pressable} from "react-native";
import SmsListener from 'react-native-android-sms-listener'
import { loginUserWithPhoneNumber } from "../redux/api";
import auth from '@react-native-firebase/auth'
import { Icon, Input } from "react-native-elements";
import { User } from "../model/types";
import { useRoute } from "@react-navigation/native";
import { maskPhoneNumber } from "../utils/validate";
const OtpScreen = ({ navigation, route }) => {
  const [confirm, setConfirm] = useState(null);
  // async function requestReadSmsPermission() {
  //   try {
  //     await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.READ_SMS,
  //     );
  //   } catch (err) {}
  // }
  // useEffect(()=>{
  //   requestReadSmsPermission
  // },[])
  const getOTP = () => {
    const confirmation = loginUserWithPhoneNumber(route.params?.data?.phone);
    setConfirm(confirmation);
  };
  
  const inputRef = useRef(null)
  useEffect(()=>{
    inputRef.current.focus();
    getOTP()
  },[])  

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", height: 50, alignItems: "center" , backgroundColor: '#F9B500'}}>
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
      <View style={styles.container}>
        <Text style={styles.titleOTP}>Nhập OTP</Text>
        <Text numberOfLines={30} style={styles.txtNote}>Mã otp đã được gửi đến số {`${maskPhoneNumber(route.params?.data?.phone)}`}. Vui lòng nhập OTP xác nhận</Text>
        <Text></Text>
        <TextInput style={styles.inputOtp} ref={inputRef}/>
        <Pressable style={{backgroundColor: 'black',padding: 10, marginTop: 20 }}>
          <Text style={{textAlign: "center", color: 'white', fontSize: 18}}>
            Xác nhận
          </Text>
        </Pressable>
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
    
  },
  inputOtp:{
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#BBB',
    padding: 10
  },
  container:{
    flex: 1,
    justifyContent: "center",
    padding: 20
  },
  txtNote:{
    textAlign: "center",
    marginVertical: 20
  },
  titleOTP:{
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: "center"
  }
})