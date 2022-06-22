import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Animated,
  Easing
} from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { Icon } from "react-native-elements";
const LoginScreen = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [users, setUsers] = useState([{ email: "123123" }]);
  const slideAnim = useRef(new Animated.Value(-300)).current
  const handleChangeEmail = (text) => {
    setUser({ ...user, email: text });
  };
  const handleChangePassword = (text) => {
    setUser({ ...user, password: text });
  };
  const displayLoginForm =()=>{
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 2000,
      easing: Easing.bezier(0.68, -0.6, 0.32, 1.6),
      useNativeDriver: false
    }).start()
  }
  const submitForm = () => {
    auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((data) =>
        firestore()
          .collection("users")
          .doc(data.user.uid)
          .set(user)
          .then(() => {
            console.log("saved!");
          })
          .catch((error) => {
            console.log(error);
          })
      )
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }

        console.error(error);
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await firestore()
        .collection("users")
        .onSnapshot((querySnapshot) => {
          const newUsers = [];
          querySnapshot.forEach((documentSnapshot) => {
            newUsers.push({ ...documentSnapshot.data() });
          });
          setUsers(newUsers);
        });
    };
    fetchData();
    return () => fetchData();
  }, []);
  useEffect(()=>{
    displayLoginForm()
    return displayLoginForm;
  },[])
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.btnBack}>
          <Icon name="arrowleft" type="antdesign" size={20} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.txtRegister}>Register</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.txtSignIn}>Sign In</Text>
      <Text style={styles.txtLorem}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar
        vitae nisi vel molestie.
      </Text>
      <Animated.View style={[styles.bottomSheet, {position: 'absolute', bottom: slideAnim, width: '100%',}]}>
        <View style={styles.content}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={user.email}
            onChangeText={handleChangeEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={handleChangePassword}
            value={user.password}
          />
          <View style={styles.viewForgotpassword}>
            <TouchableOpacity style={styles.btnForgotPassword}>
              <Text style={styles.txtForgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity style={styles.btnSignIn}>
              <Text style={styles.txtBtnSignIn}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
      {/* <TextInput
            placeholder="Email"
            onChangeText={handleChangeEmail}
            value={user.email}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            onChangeText={handleChangePassword}
            value={user.password}
            style={styles.input}
          />
          <Button onPress={submitForm} title="Sign In" /> */}
      {/* <FlatList data={users} renderItem={({item})=>{
            return(
              <Text>{item.email}</Text>
            )
          }} /> */}
    </View>
  );
};
export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFB140",
  },
  input: {
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
    marginTop: 20,
    
  },
  content: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flexDirection: "column",
    flex: 1,
  },
  viewForgotpassword: {
   
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginTop: 10,
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
    color: "#FFF",
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  txtBtnSignIn:{
    fontWeight: "800",
    fontSize: 16,
    color: 'white'
  }
});
