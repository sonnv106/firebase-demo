import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing,
  Image,

} from "react-native";
import auth from "@react-native-firebase/auth";
import { Icon } from "react-native-elements";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/actions";
const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch()
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  auth().verifyPhoneNumber
  const slideAnim = useRef(new Animated.Value(-300)).current;
  const slideInputEmail = useRef(new Animated.Value(-500)).current;
  const slideInputPassword = useRef(new Animated.Value(-500)).current;
  const txtForgotPasswordAnim = useRef(new Animated.Value(-1000)).current;
  const btnSubmitAnim = useRef(new Animated.Value(-500)).current;
  const btnLoginGoogleAnim = useRef(new Animated.Value(-500)).current;
  const btnLoginFacebookAnim = useRef(new Animated.Value(-500)).current;
  const handleChangeEmail = (text) => {
    setUser({ ...user, email: text });
  };
  const handleChangePassword = (text) => {
    setUser({ ...user, password: text });
  };
  const displayLoginForm = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 20,
        duration: 1000,
        easing: Easing.bezier(0.68, -0.6, 0.32, 1.6),
        useNativeDriver: false,
      }),
      Animated.timing(slideInputEmail, {
        toValue: 0,
        duration: 2000,
        easing: Easing.bezier(0.45, 0, 0.55, 1),
        useNativeDriver: false,
      }),
      Animated.timing(slideInputPassword, {
        toValue: 0,
        duration: 2000,
        easing: Easing.bezier(0.45, 0, 0.55, 1),
        useNativeDriver: false,
      }),
      Animated.timing(txtForgotPasswordAnim, {
        toValue: 10,
        duration: 2000,
        easing: Easing.bezier(0.45, 0, 0.55, 1),
        useNativeDriver: false,
      }),
      Animated.timing(btnSubmitAnim, {
        toValue: 0,
        duration: 2000,
        easing: Easing.bezier(0.45, 0, 0.55, 1),
        useNativeDriver: false,
      }),
      Animated.timing(btnLoginGoogleAnim, {
        toValue: 0,
        duration: 2000,
        easing: Easing.bezier(0.45, 0, 0.55, 1),
        useNativeDriver: false,
      }),
      Animated.timing(btnLoginFacebookAnim, {
        toValue: 0,
        duration: 2000,
        easing: Easing.bezier(0.25, 1, 0.5, 1),
        useNativeDriver: false,
      }),
    ]).start(() => {});
  };
  const handleLogin = () => {
    
    if(!user.email || !user.password){
      alert("Tai khoan khong duoc de trong")
      return null;
    }
   
    let regexEmail = /^\w+@\w{1,4}(.\w{1,3})+$/;
    if(regexEmail.test(user.email)){
      dispatch(loginUser(user.email, user.password))
    }
  };
  
  useEffect(() => {
    displayLoginForm();
    return ()=>{
      displayLoginForm;
    } 
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.btnBack}>
          <Icon name="arrowleft" type="antdesign" size={20} tvParallaxProperties />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          navigation.navigate('RegisterScreen');
        }}>
          <Text style={styles.txtRegister}>Register</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.txtSignIn}>Sign In</Text>
      <Text style={styles.txtLorem}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar
        vitae nisi vel molestie.
      </Text>

      <Animated.View
        style={[styles.bottomSheet, { marginTop: slideAnim, width: "100%" }]}
      >
        <View style={styles.content}>
          <Animated.View
            style={{
              marginRight: slideInputEmail,
              width: "100%",
            }}
          >
            <TextInput
              style={styles.inputEmail}
              placeholder="Email or phone number"
              value={user.email}
              onChangeText={handleChangeEmail}
            />
          </Animated.View>
          <Animated.View
            style={{
              marginLeft: slideInputPassword,
              width: "100%",
            }}
          >
            <TextInput
              style={styles.inputPassword}
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChangePassword}
              value={user.password}
            />
          </Animated.View>
          <Animated.View
            style={[
              styles.viewForgotpassword,
              { marginTop: txtForgotPasswordAnim },
            ]}
          >
            <TouchableOpacity style={styles.btnForgotPassword}>
              <Text style={styles.txtForgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            style={{
              width: "100%",
              marginLeft: btnSubmitAnim,
            }}
          >
            <TouchableOpacity style={styles.btnSignIn} onPress={handleLogin}>
              <Text style={styles.txtBtnSignIn}>Sign In</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            style={{ marginRight: btnLoginGoogleAnim, width: "100%" }}
          >
            <TouchableOpacity style={styles.btnContinueWithGoogle}>
              <Image
                source={require("../assets/images/icon-google.png")}
                style={{ width: 36, height: 36 }}
              />
              <Text style={styles.txtContinueGoogle}>Continue with Google</Text>
              <Icon name="arrowright" type="antdesign" size={24} tvParallaxProperties />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            style={{ marginLeft: btnLoginFacebookAnim, width: "100%" }}
          >
            <TouchableOpacity style={styles.btnContinueFacebook}>
              <Image
                source={require("../assets/images/icon-facebook.png")}
                style={{ width: 36, height: 36 }}
              />
              <Text style={styles.txtContinueGoogle}>
                Continue with Facebook
              </Text>
              <Icon name="arrowright" type="antdesign" size={24} tvParallaxProperties/>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Animated.View>

    </View>
  );
};
export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFB140",
  },
  inputPassword: {
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
  txtRegister: {
    fontSize: 18,
    fontWeight: "500",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  btnBack: {
    padding: 5,
    paddingLeft: 0,
  },
  txtSignIn: {
    fontWeight: "900",
    fontSize: 32,
    marginTop: 20,
    paddingHorizontal: 16,
  },
  txtLorem: {
    marginTop: 10,
    fontWeight: "400",
    fontSize: 16,
    paddingHorizontal: 16,
  },
  bottomSheet: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
  },
  content: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
  },
  viewForgotpassword: {
    alignItems: "flex-end",
    justifyContent: "flex-end",

    width: "100%",
  },
  btnForgotPassword: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  txtForgotPassword: {
    right: 0,
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "500",
    flexDirection: "row",
    textAlign: "right",
    lineHeight: 18,
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
  btnContinueWithGoogle: {
    backgroundColor: "#FFFFFF",
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,

    elevation: 4,
    paddingHorizontal: 10,
  },
  txtContinueGoogle: {
    flex: 1,

    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
  },
  btnContinueFacebook: {
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 4,
    paddingHorizontal: 10,
    marginBottom: 50,
  },
});
