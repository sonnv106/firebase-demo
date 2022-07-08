import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import auth from "@react-native-firebase/auth";
import BottomTabsNavigator from "./src/screens/BottomTabsNavigator";
import SearchScreen from "./src/screens/SearchScreen";
import AllProductsScreen from "./src/screens/AllProductsScreen";
import BeveragesScreen from "./src/screens/BeveragesScreen";
import CondimentsScreen from "./src/screens/CondimentsScreen"
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
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
