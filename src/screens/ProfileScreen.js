import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions";
import auth from "@react-native-firebase/auth";
import axios from "axios";
const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;
const IMAGE_SIZE = 80;
const SPACING = 10;
const ProfileScreen = () => {
  const [images, setImages] = useState([]);
  // const dispatch = useDispatch();
  // const logout = () => {
  //   dispatch(logoutUser());
  // };
  useEffect(() => {
    const fetchImages = async () => {
      const images = await axios.get(
        "https://jsonplaceholder.typicode.com/photos"
      );
      let result = images.data;
      setImages(result);
    };
    fetchImages();
  }, []);
  const topRef = useRef();
  const thumbRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollActiveIndex = (index)=>{
    setActiveIndex(index)
    topRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true
    })
    if(index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE/2 > width/2){
      thumbRef?.current.scrollToOffset({
        offset: index*(IMAGE_SIZE + SPACING) - width/2 + IMAGE_SIZE/2,
        animated: true
      })
    }
  }
  return (
    <View style={styles.container}>
      {/* <Button title="Logout" onPress={logout} /> */}
      <FlatList
      ref={topRef}
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd = {event => scrollActiveIndex(Math.floor(event.nativeEvent.contentOffset.x/width))}
        renderItem={({ item }) => {
          return (
            <View style={{ width, height }}>
              <Image
                source={{ uri: item.url }}
                style={[StyleSheet.absoluteFillObject]}
              />
            </View>
          );
        }}
      />
      <FlatList
      ref={thumbRef}
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ position: "absolute", bottom: IMAGE_SIZE}}
        contentContainerStyle = {{paddingHorizontal: SPACING}}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity onPress = {()=> scrollActiveIndex(index)}>
              <Image
              source={{ uri: item.url }}
              style={{
                height: IMAGE_SIZE,
                width: IMAGE_SIZE,
                borderRadius: 12,
                marginRight: SPACING,
                borderWidth: 2,
                borderColor: activeIndex === index ? '#FFF' : 'transparent'
              }}
            />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
export default ProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
