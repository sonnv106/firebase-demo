import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
const windowWidth = Dimensions.get("window").width;
const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    firestore()
      .collection("products")
      .onSnapshot((querySnapshot) => {
        const newProducts = [];
        querySnapshot.forEach((documentSnapshot) => {
          newProducts.push(documentSnapshot.data());
        });
        setProducts(newProducts);
      });

    return () => {};
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: "#F9DBBD",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: '45%',
          paddingHorizontal: 5,
        }}
        key={index}
      >
        <Image
          source={{ uri: item.image[0] }}
          style={{ height: 150, width: "100%" }}
        />
        <Text>{item.name}</Text>
        <Text>{item.amount}</Text>
        <Text>{item.price}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        style={{ flex: 1, width: "100%" }}
        horizontal={false}
        numColumns={2}
        contentContainerStyle={styles.flatlist}
      />
    </View>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  flatlist: {
    flex: 1,
    paddingTop: 10,
    alignItems: "center",
    width: "100%",
    
    backgroundColor: 'blue',
   
  },
});
