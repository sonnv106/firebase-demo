import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  // KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { Icon } from "react-native-elements";
import { useDispatch } from "react-redux";
import { loginUserWithPhoneNumber } from "../redux/api";
// import tinh_tp from "../hanhchinhvn/tinh_tp.json";
// import quan_huyen from "../hanhchinhvn/quan_huyen.json";
// import xa_phuong from "../hanhchinhvn/xa_phuong.json";
// import DropDownPicker from "react-native-dropdown-picker";
import {
  formatPhoneNumber,
  isVietnamesePhoneNumber,
  showToast,
} from "../utils/validate";
import { User } from "../model/types";
const RegisterScreen = ({ navigation, route }) => {
  
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [rePasswordVisible, setRePasswordVisible] = useState(true);
  const [rePassword, setRePassword] = useState("");
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
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const dispatch = useDispatch();

  const handleChangeName = (username: string) => {
    setUserInfo({
      ...userInfo,
      name: username.trim(),
    });
  };
  const handleChangePhoneNumber = (phone: string) => {
    setUserInfo({
      ...userInfo,
      phone: formatPhoneNumber(phone.trim()),
    });
  };
  const handleChangePassword = (password: string) => {
    setUserInfo({
      ...userInfo,
      password: password.trim(),
    });
  };
  const handleChangeRepassword = (rePassword: string) => {
    if (rePassword) {
      setRePassword(rePassword.trim());
    } else {
      setRePassword("");
    }
  };

  const handleRegister = () => {
    
    if (!userInfo.name) {
      showToast("error", "Tên không được bỏ trống", "Vui lòng nhập lại");
      nameRef.current.focus()
      return;
    }if (userInfo.name.length<6) {
      showToast("error", "Tên quá ngắn", "Vui lòng nhập lại");
      nameRef.current.focus()
      return;
    }if (!userInfo.phone) {
      showToast("error", "Số điện thoại không được bỏ trống", "Vui lòng nhập số điện thoại");
      phoneRef.current.focus();
      return;
    } 
    if(!isVietnamesePhoneNumber(userInfo.phone)){
      showToast("error", "Số điện thoại không đúng định dạng", "Vui lòng nhập số điện thoại");
      phoneRef.current.focus();
      return;
    }
    if(!userInfo.password){
      showToast('error', 'Mật khẩu không được bỏ trống', 'Vui lòng nhập mật khẩu');
      return;
    }
    if (userInfo.password !== rePassword) {
      showToast("error", "Mật khẩu không khớp", "Vui lòng nhập lại");
      return
    }
    if (userInfo.password.length < 6) {
      showToast("error", "Mật khẩu phải lớn hơn hoặc bằng 6 ký tự", "Vui lòng nhập lại");
      phoneRef.current.focus();
      return;
    } else {
      navigation.navigate("OtpScreen", {
        data: userInfo
      });
      setUserInfo(new User());
      setRePassword('')
    }

    // navigation.navigate('OtpScreen'  )
  };

 
  return (
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

      <View style={{ width: "100%", flexDirection: "column", marginTop: 20 }}>
        <Text>Họ và tên</Text>
        <TextInput
          ref={nameRef}
          style={styles.inputName}
          placeholder="Name"
          onChangeText={handleChangeName}
          maxLength={50}
          value={userInfo.name ? userInfo.name : ""}
        />
      </View>
      <View style={{ width: "100%", flexDirection: "column", marginTop: 20 }}>
        <Text>Số điện thoại</Text>
        <TextInput
          style={styles.inputName}
          placeholder="Phone number"
          value={userInfo.phone ? formatPhoneNumber(userInfo.phone) : ""}
          onChangeText={handleChangePhoneNumber}
          keyboardType="number-pad"
          maxLength={10 | 11}
          ref={phoneRef}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text>Mật khẩu</Text>
        <View style={styles.viewPassword}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Password"
            value={userInfo.password ? userInfo.password : ""}
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
                style={{ padding: 10 }}
              />
            ) : (
              <Icon
                type="ionicon"
                name="eye-off-outline"
                tvParallaxProperties
                size={20}
                style={{ padding: 10 }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text>Nhập lại mật khẩu</Text>
        <View style={styles.viewPassword}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Confirm Password"
            value={rePassword ? rePassword : ""}
            onChangeText={handleChangeRepassword}
            secureTextEntry={rePasswordVisible}
          />
          <TouchableOpacity
            onPress={() => {
              setRePasswordVisible(!rePasswordVisible);
            }}
            style={styles.btnHiddenPassword}
          >
            {rePasswordVisible ? (
              <Icon
                type="ionicon"
                name="eye-outline"
                tvParallaxProperties
                size={20}
                style={{ padding: 10 }}
              />
            ) : (
              <Icon
                type="ionicon"
                name="eye-off-outline"
                tvParallaxProperties
                size={20}
                style={{ padding: 10 }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.btnSignIn} onPress={handleRegister}>
        <Text style={styles.txtBtnSignIn}>Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
export default RegisterScreen;
const styles = StyleSheet.create({
  inputName: {
    width: "100%",
    height: 50,
    borderBottomColor: "#DDD",
    borderBottomWidth: 1,
  },
  inputPassword: {
    borderColor: "#F7F3E3",

    height: 50,
    shadowColor: "#000",
    flex: 1,
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
    alignItems: "center",
    width: "100%",
    borderBottomColor: "#DDD",
    borderBottomWidth: 1,
  },
  btnSignIn: {
    backgroundColor: "#000",
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    width: "100%",
  },
  txtBtnSignIn: {
    fontWeight: "800",
    fontSize: 16,
    color: "white",
  },
});
