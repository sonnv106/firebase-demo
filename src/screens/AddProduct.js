import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import { utils } from "@react-native-firebase/app";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";

const AddProduct = ({ navigation }) => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    amount: "",
    image: "",
    // ingredients: '',
    // preserve: '',
    // source:'',
    // certificate: '',
    // warning:'',
    // origin: '',
    // detail: '',
    // category:'',
  });
  const handleChangeName = (name) => {
    setProduct({ ...product, name });
  };
  const handleChangePrice = (price) => {
    setProduct({ ...product, price });
  };
  const handleChangeAmount = (amount) => {
    setProduct({ ...product, amount });
  };
  const chooseImage = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        selectionLimit: 5,
      },
      (response) => {
        setProduct({ ...product, image: response.assets?.[0].uri ?? "" });
      }
    );
  };
  const addProduct = async () => {
    const filename = product.image.substring(
      product.image.lastIndexOf("/") + 1
    );
    // const reference = storage().ref(filename)

    const uploadUri =
      Platform.OS === "ios"
        ? product.image.replace("file://", "")
        : product.image.replace("file://", "");

    // const pathToFile=  `${utils.FilePath.PICTURES_DIRECTORY}`
    console.log(uploadUri)
    const task = storage().ref(filename).putFile(uploadUri);
    task.on("state_changed", (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
      );
    });
    task
      .then( () => {
        firestore().collection('products').add(product).then((response)=>{
          
        })
        navigation.navigate('Home')
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const getDownloadURL = async (filename) => {
  //   let url = await storage().ref(filename).getDownloadURL();
  //   return url;
  // };
  return (
    <View>
      <ScrollView contentContainerStyle={{ padding: 10 }}>
        <TextInput
          style={styles.input}
          placeholder="Tên sản phẩm"
          onChangeText={handleChangeName}
          value={product.name}
        />
        <TextInput
          style={styles.input}
          placeholder="Giá"
          onChangeText={handleChangePrice}
          value={product.price}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Số lượng"
          onChangeText={handleChangeAmount}
          value={product.amount}
          keyboardType="numeric"
        />
        <TouchableOpacity style={{ marginTop: 30 }} onPress={chooseImage}>
          <Text>Choose Image</Text>
        </TouchableOpacity>
        {product.image?<Image
          source={{uri:  product.image}}
          style={{ width: 100, height: 100, borderRadius: 100 }}
        />:null}
        <TouchableOpacity style={styles.btnSignIn} onPress={addProduct}>
          <Text style={styles.txtBtnSignIn}>Add</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
export default AddProduct;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DDD",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderRadius: 50,
    borderColor: "#F7F3E3",
    marginTop: 20,
    width: "100%",
    height: 50,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FBFBFB",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnSignIn: {
    backgroundColor: "#000",
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  txtBtnSignIn: {
    fontWeight: "800",
    fontSize: 16,
    color: "white",
  },
});
