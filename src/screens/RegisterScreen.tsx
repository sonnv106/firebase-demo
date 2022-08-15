import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import { Icon } from "react-native-elements";
import { Input } from "react-native-elements";
import { User } from "../model/user/User";
const RegisterScreen = ({navigation, route}) => {
  const initialUser: User = { email: "", password: "" };
  const [passwordVisible, setPasswordVisible] = useState(true);
  let [rePassword, setRePassword] = useState("");
  const [user, setUser] = useState<User>(initialUser);
  const handleChangePhoneNumber = (text: string) => {};

  const handleChangePassword = (text: string) => {
    setUser({
      ...user,
      password: text,
    });
  };
  const handleChangeRepassword = (text: string) => {
    rePassword = text;
  };
  const handleRegister = ()=>{
    navigation.navigate('OtpScreen')
  }
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        style={{ flex: 1 }}
      >
        <View>
          <Text>Đăng ký</Text>
        </View>
        <View style={{ flex: 1 }}>
          <View>
            <TextInput
              style={styles.inputEmail}
              placeholder="Phone number"
              value={user.phone}
              onChangeText={handleChangePhoneNumber}
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.viewPassword}>
            <TextInput
              style={styles.inputPassword}
              placeholder="********"
              value={user.password}
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
                <Icon type="ionicon" name="eye-outline" tvParallaxProperties  size={20}  />
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
          <View>
            <TextInput
              style={styles.inputEmail}
              placeholder="Repassword"
              value={user.phone}
              onChangeText={handleChangePhoneNumber}
              secureTextEntry= {passwordVisible}
            />
          </View>
          <TouchableOpacity style={styles.btnSignIn} onPress={handleRegister}>
              <Text style={styles.txtBtnSignIn}>Register</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;
const styles = StyleSheet.create({
  inputEmail: {
    borderRadius: 50,
    borderColor: "#F7F3E3",
    marginTop: 20,
    width: "100%",
    height: 50,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FBFBFB",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputPassword: {
    borderColor: "#F7F3E3",
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    flex: 1,
    height: 50,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FBFBFB",
    shadowColor: "#000",
  },
  contentContainerStyle: {
    paddingHorizontal: 20,
  },
  btnHiddenPassword: {
    padding: 10,
    height: '100%',
    alignItems: 'center',
    flexDirection: "row",
    borderRadius: 100,
    
  },
  viewPassword: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FBFBFB",
    borderRadius: 40,
    marginTop: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    
    
  },
  btnSignIn: {
    backgroundColor: "#000",
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  txtBtnSignIn: {
    fontWeight: "800",
    fontSize: 16,
    color: "white",
  },
});
