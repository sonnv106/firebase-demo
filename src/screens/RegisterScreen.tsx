import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import { useDispatch } from "react-redux";
import { loginUserWithPhoneNumber } from "../redux/api";
import RNFS from 'react-native-fs';
import tinh_tp from '../hanhchinhvn/tinh_tp.json'
import DropDownPicker from "react-native-dropdown-picker";
interface User {
  name: string;
  phoneNumber: string;
  password: string;
  repassword: string;
  address?: ""
}
const RegisterScreen = ({ navigation, route }) => {
  const [phone, setPhone] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(true);
  let [rePassword, setRePassword] = useState("");
  const [user, setUser] = useState<User>({
    name: "",
    phoneNumber: "",
    password: "",
    repassword: "",
    address: "",
  });
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  
  const dispatch = useDispatch();
  const handleChangePhoneNumber = (text: string) => {
    setPhone(text);
  };
  const handleChangeName = ()=>{

  }
  const handleChangePassword = (text: string) => {
    setUser({
      ...user,
      password: text,
    });
  };
  const handleChangeRepassword = (text: string) => {
    rePassword = text;
  };
  
  const handleRegister = () => {
    
    navigation.navigate('OtpScreen')
    // navigation.navigate('OtpScreen'  )
  };
  useEffect(()=>{
    var arr = []
    for(let i in tinh_tp){
      arr.push(tinh_tp[i])
    }
    for(let i= 0; i<arr.length; i++){
      arr[i]['value']=arr[i].slug
      arr[i]['label']=arr[i].name
    }
    setItems(arr)
  },[])
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{ flex: 1 }}
      >
        <View>
          <Text>Đăng ký</Text>
        </View>
        <View style={{ flex: 1 }}>
          <View>
            <TextInput
              style={styles.inputName}
              placeholder="Name"
              onChangeText={handleChangeName}
              
            />
            <TextInput
              style={styles.inputName}
              placeholder="Phone number"
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
          <TextInput
              style={styles.inputName}
              placeholder="Địa chỉ"
              onChangeText={handleChangePhoneNumber}
            />
          <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
          />
          <TouchableOpacity style={styles.btnSignIn} onPress={handleRegister}>
            <Text style={styles.txtBtnSignIn}>Register</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    </View>
  );
};
export default RegisterScreen;
const styles = StyleSheet.create({
  inputName: {
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
    height: "100%",
    alignItems: "center",
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
