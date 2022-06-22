import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import auth from '@react-native-firebase/auth'
const ProfileScreen = ()=>{
    const logout = ()=>{
        auth().signOut().then(()=>{
            console.log('User signed out!')
        })
    }
    return(
        <View>
            <Button title="Logout" onPress={logout}/>
        </View>
    )
}
export default ProfileScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#DDD",
        alignItems: "center",
        justifyContent: "center",
      },
})