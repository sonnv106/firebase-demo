import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { loginUserWithPhoneNumber } from "../redux/api";
import auth from '@react-native-firebase/auth'
import { Icon, Input } from "react-native-elements";
const OtpScreen = ({ navigation, route }) => {
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState({
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
  })
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const fifthInput = useRef();
  const sixInput = useRef();
  const getOTP = ()=>{
    const  confirmation = loginUserWithPhoneNumber('84968565096');
    console.log("111111",confirmation)
    setConfirm(confirmation)
  }
  useEffect(()=>{
    getOTP()
  },[])
  
  const handleSubmit =async ()=>{
    try {
      let otp = code[1].concat(code[2]).concat(code[3]).concat(code[4]).concat(code[5]).concat(code[6]);
      const user  = await confirm.confirm(otp)
      console.log('user',user)
    } catch (error) {
      console.log('Invalid code.');
    }
   
  }
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
      <View style={{ flex: 1 }}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            padding: 10,
          }}
        >
          <Image
            source={require("../assets/images/paper-plane.png")}
            style={{ width: 150, height: 150 }}
            resizeMode="contain"
          />
        </View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 22,
            fontWeight: "900",
            paddingHorizontal: 16,
            color: "#DB5461",
          }}
        >
          Enter OTP code to verify
        </Text>
        <Text
          style={{
            marginTop: 20,
            textAlign: "center",
            fontSize: 16,
          }}
        >
          A 6 digit verification code has been sent to ...246
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            paddingHorizontal: 10,
          }}
        >
          <TextInput
            style={{
              width: 50,
              height: 50,
              textAlign: "center",
              fontSize: 26,
              borderBottomColor: "#DB5461",
              borderBottomWidth: 2,
            }}
            keyboardType="number-pad"
            maxLength={1}
            ref={firstInput}
            onChangeText={(text)=>{
              setCode({...code, "1": text});
              text && secondInput?.current?.focus();
            }}
          />
          <TextInput
            style={{
              width: 50,
              height: 50,
              textAlign: "center",
              fontSize: 26,
              borderBottomColor: "#DB5461",
              borderBottomWidth: 2,
            }}
            keyboardType="number-pad"
            maxLength={1}
            ref={secondInput}
            onChangeText={(text)=>{
              setCode({...code, "2": text});
              text ? thirdInput?.current?.focus() : firstInput?.current?.focus();
            }}
          />
          <TextInput
            style={{
              width: 50,
              height: 50,
              textAlign: "center",
              fontSize: 26,
              borderBottomColor: "#DB5461",
              borderBottomWidth: 2,
            }}
            keyboardType="number-pad"
            maxLength={1}
            ref={thirdInput}
            onChangeText={(text)=>{
              setCode({...code, "3": text});
              text ? fourthInput?.current?.focus() : secondInput?.current?.focus();
            }}
          />
          <TextInput
            style={{
              width: 50,
              height: 50,
              textAlign: "center",
              fontSize: 26,
              borderBottomColor: "#DB5461",
              borderBottomWidth: 2,
            }}
            keyboardType="number-pad"
            maxLength={1}
            ref={fourthInput}
            onChangeText={(text)=>{
              setCode({...code, "4": text});
              text ? fifthInput?.current?.focus() : thirdInput?.current?.focus();
            }}
          />
          <TextInput
            style={{
              width: 50,
              height: 50,
              textAlign: "center",
              fontSize: 26,
              borderBottomColor: "#DB5461",
              borderBottomWidth: 2,
            }}
            keyboardType="number-pad"
            maxLength={1}
            ref={fifthInput}
            onChangeText={(text)=>{
              setCode({...code, "5": text});
              text ? sixInput?.current?.focus() : fourthInput?.current?.focus();
            }}
          />
          <TextInput
            style={{
              width: 50,
              height: 50,
              textAlign: "center",
              fontSize: 26,
              borderBottomColor: "#DB5461",
              borderBottomWidth: 2,
            }}
            keyboardType="number-pad"
            maxLength={1}
            ref={sixInput}
            onChangeText={(text)=>{
              setCode({...code, "6": text});
              !text && fifthInput?.current?.focus() 
            }}
          />
        </View>
        <TouchableOpacity onPress={()=>handleSubmit()}>
          <Text>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OtpScreen;
