import { registerRootComponent } from "expo";
import messaging from '@react-native-firebase/messaging';
import { Provider } from "react-redux";
import promiseMiddleware from 'redux-promise'
import {compose, applyMiddleware, createStore} from 'redux';
import rootReducer from "./src/redux/reducers";
import Toast from 'react-native-toast-message'
import App from "./App";
import { View,Text } from "react-native";
if (__DEV__) {
  import("./ReactotronConfig").then(() => console.log("Reactotron Configured"));
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware  = createStore(rootReducer, composeEnhancers(applyMiddleware(promiseMiddleware)));

messaging().setBackgroundMessageHandler(async remoteMessage=>{
  console.log('Message handled in the background!', remoteMessage);
})
const toastConfig = {
  success:  ({text1 })=>(
    <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
      <Text>{text1}</Text>
    </View>
  )
}
const reduxApp = ()=>(
  <Provider store={createStoreWithMiddleware}>
    <App/>
    <Toast config={toastConfig}/>
  </Provider>
)
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(reduxApp);
