import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions";
import auth from "@react-native-firebase/auth";
const ProfileScreen = () => {
  
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutUser());
  };
  
  return (
    <View>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};
export default ProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DDD",
    alignItems: "center",
    justifyContent: "center",
  },
});
