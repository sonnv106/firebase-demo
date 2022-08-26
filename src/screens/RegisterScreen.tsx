import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { Icon, Input} from "react-native-elements";
import { useDispatch } from "react-redux";
import { loginUserWithPhoneNumber } from "../redux/api";
import RNFS from "react-native-fs";
import tinh_tp from "../hanhchinhvn/tinh_tp.json";
import quan_huyen from "../hanhchinhvn/quan_huyen.json";
import xa_phuong from "../hanhchinhvn/xa_phuong.json";
import DropDownPicker from "react-native-dropdown-picker";

import { User } from "../model/types";
const RegisterScreen = ({ navigation, route }) => {
  const [confirm, setConfirm] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(true);
  let [rePassword, setRePassword] = useState("");
  const [userInfo, setUserInfo] = useState<User>({
    id: "",
    docId: "",
    email: "",
    password: "",
    isAdmin: false,
    active: false,
    name: "",
    phone: "",
    avatar: "",
    address: {
      city: "",
      district: "",
      street: "",
    },
    favoriteProduct: [],
    token: "",
    created_at: null,
    updated_at: null,
    dateOfBirth: null,
    lastActiveTime: null,
    status: null,
    sex: false,
    codeDiscount: [],
  });

  const dispatch = useDispatch();
  const handleChangePhoneNumber = (text: string) => {};
  const handleChangeName = () => {};
  const handleChangePassword = (text: string) => {
    setUserInfo({
      ...userInfo,
      password: text,
    });
  };
  const handleChangeRepassword = (text: string) => {
    rePassword = text;
  };

  const handleRegister = () => {
    navigation.navigate("OtpScreen");
    // navigation.navigate('OtpScreen'  )
  };

  const getOTP = () => {
    const confirmation = loginUserWithPhoneNumber(userInfo.phone);

    setConfirm(confirmation);
  };
  return (
    <View style={{}}>
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/images/paper-plane.png")}
          style={{ width: 150, height: 150 }}
          resizeMode="cover"
        />
        <View>
          <Text>Đăng ký</Text>
        </View>

        <View style={{ width: "100%" }}>
          <Input
            autoCompleteType
            style={styles.inputName}
            placeholder="Name"
            onChangeText={handleChangeName}
          />
          <Input
          autoCompleteType
            style={styles.inputName}
            placeholder="Phone number"
            onChangeText={handleChangePhoneNumber}
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.viewPassword}>
          <Input
          autoCompleteType
            style={styles.inputPassword}
            placeholder="Password"
            value={userInfo.password}
            onChangeText={handleChangePassword}
            secureTextEntry={passwordVisible}
          />
          <TouchableOpacity
            onPress={() => {
              setPasswordVisible(!passwordVisible);
            }}
            style={styles.btnHiddenPassword}
          >
            {passwordVisible ? (
              <Icon
                type="ionicon"
                name="eye-outline"
                tvParallaxProperties
                size={20}
              />
            ) : (
              <Icon
                type="ionicon"
                name="eye-off-outline"
                tvParallaxProperties
                size={20}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.viewPassword}>
          <Input
          autoCompleteType
            style={styles.inputPassword}
            placeholder="Confirm Password"
            value={userInfo.password}
            onChangeText={handleChangePassword}
            secureTextEntry={passwordVisible}
          />
          <TouchableOpacity
            onPress={() => {
              setPasswordVisible(!passwordVisible);
            }}
            style={styles.btnHiddenPassword}
          >
            {passwordVisible ? (
              <Icon
                type="ionicon"
                name="eye-outline"
                tvParallaxProperties
                size={20}
              />
            ) : (
              <Icon
                type="ionicon"
                name="eye-off-outline"
                tvParallaxProperties
                size={20}
              />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btnSignIn} onPress={handleRegister}>
          <Text style={styles.txtBtnSignIn}>Register</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;
const styles = StyleSheet.create({
  inputName: {
    marginTop: 20,
    width: "100%",
    height: 50,
    borderBottomColor: "#DDD",
    borderBottomWidth: 1,
  },
  inputPassword: {
    borderColor: "#F7F3E3",

    flex: 1,
    height: 50,
    shadowColor: "#000",
  },
  contentContainerStyle: {
    paddingHorizontal: 20,
  },
  btnHiddenPassword: {
    height: "100%",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 100,
  },
  viewPassword: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    borderBottomColor: "#DDD",
    borderBottomWidth: 1,
    marginTop: 20,
  },
  btnSignIn: {
    backgroundColor: "#000",
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  txtBtnSignIn: {
    fontWeight: "800",
    fontSize: 16,
    color: "white",
  },
});
