import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import auth from "@react-native-firebase/auth";
import BottomTabsNavigator from "./src/screens/BottomTabsNavigator";
const Stack = createNativeStackNavigator();
export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen
            name="BottomTabsNavigator"
            component={BottomTabsNavigator}
          />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}
