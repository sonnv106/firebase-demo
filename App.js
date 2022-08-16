import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import auth from "@react-native-firebase/auth";
import BottomTabsNavigator from "./src/screens/BottomTabsNavigator";
import SearchScreen from "./src/screens/SearchScreen";
import AllProductsScreen from "./src/screens/AllProductsScreen";
import BeveragesScreen from "./src/screens/BeveragesScreen";
import CondimentsScreen from "./src/screens/CondimentsScreen";
import messaging from '@react-native-firebase/messaging';
import RegisterScreen from "./src/screens/RegisterScreen";
import OtpScreen from "./src/screens/OtpScreen";
import { useDispatch, useSelector } from "react-redux";
import { autoSignIn } from "./src/redux/actions";
import { Alert } from "react-native";
const Stack = createNativeStackNavigator();
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
export default function App({...props}) {
  const [initializing, setInitializing] = useState(true);
  // const [user, setUser] = useState();
  const dispatch = useDispatch()
  
  // const onAuthStateChanged = (user) => {
  //   setUser(user);
  //   if (initializing) {
  //     setInitializing(false);
  //   }
  // };
  const user = useSelector(state=>state.auth_reducer);
  
  useEffect(() => {
    dispatch(autoSignIn())
   
    // const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    // return subscriber;
  },[dispatch]);
  useEffect(()=>{
    const unsubcribe = messaging().onMessage(async remoteMessage=>{
      Alert.alert('A new message arrived!', JSON.stringify(remoteMessage))
    })
    return unsubcribe;
  },[])
  messaging().setBackgroundMessageHandler(async remoteMessage=>{
    console.log('Message handled in the background!', remoteMessage);
  })
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user.isAuth ? (
          <Stack.Group>
            <Stack.Screen
              name="BottomTabsNavigator"
              component={BottomTabsNavigator}
            />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Group>
        )}
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
          <Stack.Screen name="AllProductsScreen" component={AllProductsScreen}  />
          <Stack.Screen name="BeveragesScreen" component={BeveragesScreen} />
          <Stack.Screen name="CondimentsScreen" component={CondimentsScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="OtpScreen" component={OtpScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
