import React, { useRef } from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { Icon, Input } from "react-native-elements";
const OtpScreen = ({ navigation }) => {
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const fifthInput = useRef();
  const sixInput = useRef();
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
              !text && fifthInput?.current?.focus() 
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default OtpScreen;
