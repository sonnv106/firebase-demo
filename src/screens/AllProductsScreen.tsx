import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { formatCurrency } from "../utils/validate";

const windowWidth = Dimensions.get("window").width;

const AllProductsScreen = () => {

  const [products, setProducts] = useState([]);
  const fetchData =()=>{
    firestore()
    .collection("products")
    .onSnapshot((querySnapshot) => {
      const newProducts = [];
      querySnapshot.forEach((documentSnapshot) => {
        newProducts.push(documentSnapshot.data());
      });
      setProducts(newProducts);
    });

  }
  useEffect(() => {
    fetchData()
    return () => {};
  }, []);
  const renderItem = ({ item, index }) => {
    return (
      <Pressable style={styles.itemProduct} key={index}>
        <Image
          source={{ uri: item.image[0] }}
          style={{ width: "100%", height: 200 }}
          resizeMode="cover"
        />

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={[styles.txtPrice, { color: "black" }]}>
            {"Giá nhập: "}
          </Text>
          <Text style={styles.txtPrice}>
            {formatCurrency(item.price) + "đ"}
          </Text>
        </View>

        <Text>{item.name}</Text>
        <Text>{item.packing}</Text>
      </Pressable>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        style={styles.flatlist}
        horizontal={false}
        numColumns={2}
        contentContainerStyle={styles.contentContainerStyle}
        columnWrapperStyle={styles.columnWrapperStyle}
      />
    </View>
  );
};
export default AllProductsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainerStyle: {
    paddingTop: 10,
    width: "100%",
    alignItems: "center",
  },
  flatlist: {  width: "100%",},
  txtPrice: {
    marginTop: 10,
    color: "red",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
  },
  columnWrapperStyle: {
    borderRadius: 10,
  },
  itemProduct: {
    justifyContent: "center",
    flexDirection: "column",
    width: (windowWidth - 36) / 2,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    elevation: 1,
    shadowOffset: {
      height: 0,
      width: 2,
    },
    shadowRadius: 5,
    backgroundColor: "#FFF",
    margin: 6,
    marginTop: 0,
    borderRadius: 8,
    padding: 10,
  },
});
