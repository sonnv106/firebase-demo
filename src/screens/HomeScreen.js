import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
const windowWidth = Dimensions.get("window").width;
import { formatCurrency } from "../utils/CurrencyFormat";
import { Header, Icon } from "react-native-elements";


const HomeScreen = ({navigation}) => {
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
      <TouchableOpacity style={styles.itemProduct} key={index}>
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
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Header
        ViewComponent={LinearGradient}
        linearGradientProps={{
          colors: ["#F9B500", "#F9B500"],
        }}
        centerComponent={{
          text: "Danh sách sản phẩm",
          style: styles.heading
        }}
        leftComponent={
          <View>
            {/* <Icon type="antdesign" name="home" color="white" /> */}
          </View>
        }
        rightComponent={<TouchableOpacity onPress={()=>navigation.push('SearchScreen')}>
          <Icon type="antdesign" name="search1" />
        </TouchableOpacity>}
      />
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
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainerStyle: {
    flex: 1,
    paddingTop: 10,
    width: "100%",
    alignItems: 'center'
  },
  columnWrapperStyle: {
    borderRadius: 10,
  },
  flatlist: { flex: 1, width: "100%" },
  txtPrice: {
    marginTop: 10,
    color: "red",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
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
    shadowRadius: 20,
    backgroundColor: "#FFF",
    margin: 6,
    borderRadius: 8,
    padding: 10,
  },
  heading:{
    fontSize: 18,
    color: "black",
    fontFamily: "Oswald-Regular",
    fontWeight: "400",
  },
});
