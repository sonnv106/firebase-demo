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
  Dimensions,
} from "react-native";
import { utils } from "@react-native-firebase/app";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { checkNull } from "../utils/CurrencyFormat";
import storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";

const AddProduct = ({ navigation }) => {
  const [product, setProduct] = useState({
    name: "",
    price: null,
    packing: "",
    image: [],
    // ingredients: '',
    // preserve: '',
    // source:'',
    // certificate: '',
    // warning:'',
    // origin: '',
    // detail: '',
    // category:'',
  });
  const windowWidth = Dimensions.get("window").width;
  const handleChangeName = (name) => {
    setProduct({ ...product, name });
  };
  const handleChangePrice = (price) => {
    setProduct({ ...product, price });
  };
  const handleChangeAmount = (packing) => {
    
    setProduct({ ...product, packing });
  };
  const chooseImage = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        selectionLimit: 5,
      },
      (response) => {
        setProduct({
          ...product,
          image: response.assets?.map((item) => {
            return item.uri;
          }),
        });
      }
    );
  };
  useEffect(()=>{
    
  },[product])
  //tai anh tra ve url
  const getDownloadURL = async (filename) => {
    let url = await storage().ref(filename).getDownloadURL();
    return url;
  };
  // them san pham

  const addProduct = async () => {
    //mảng image product đã được upload
    const response = await uploadImages(product.image);
    await firestore()
      .collection("products")
      .add({...product, image: response})
      .then(() => {
        console.log("Saved data!");
      });
    setProduct({})
  };
  const uploadImages = async (images) => {
    let imagesUploaded = [];
    let urlsUploaded = []
    for (const image of images) {
      const url = await uploadAnImage(image);
      imagesUploaded.push(url);
    } 
    for(const imageUploaded of imagesUploaded){
      const urlUploaded =  await storage().ref(imageUploaded).getDownloadURL()
      urlsUploaded.push(urlUploaded)
    }
    return urlsUploaded;
  };
  const uploadAnImage = (filename) => {
    return new Promise((resolve, reject) => {
      //pathTofile là tên file được lưu trên storage
      const pathToFile = filename.substring(filename.lastIndexOf("/") + 1);
      //reference là đường dẫn thư mục trên storage
      const reference = storage().ref(`products/${pathToFile}`);
      //filename là đường dẫn tuyệt đối dẫn tới file trong device
      const task = reference.putFile(filename);
      task.on("state_changed", (taskSnapshot) => {});
      task
        .then((res) => {

          resolve(res?.metadata?.fullPath || "");
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
  return (
    <View>
      <ScrollView contentContainerStyle={{ padding: 10 }}>
        <TextInput
          style={styles.input}
          placeholder="Tên sản phẩm"
          onChangeText={handleChangeName}
          value={product.name}
        />
        {/* {product.name.length===0?<Text style={{color: 'red', paddingLeft: 20, marginTop: 8}}>{"Không được bỏ trống"}</Text>:null} */}
        <TextInput
          style={styles.input}
          placeholder="Giá"
          onChangeText={handleChangePrice}
          value={product.price}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Quy cách"
          onChangeText={handleChangeAmount}
          value={product.packing}
          
        />
        <TouchableOpacity style={styles.btnChooseImage} onPress={chooseImage}>
          <Text>Choose Image</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          {product.image
            ? product.image.map((item, index) => {
                if (product.image.length <= 4) {
                  return (
                    <View key={index}>
                      <TouchableOpacity key={index}>
                        <Image
                          source={{ uri: item }}
                          style={{
                            width: (windowWidth - 20) / 4,
                            height: (windowWidth - 20) / 4,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                } else {
                  if (index < 4) {
                    return (
                      <View key={index}>
                        <TouchableOpacity>
                          <Image
                            source={{ uri: item }}
                            style={{
                              width: (windowWidth - 20) / 4,
                              height: (windowWidth - 20) / 4,
                            }}
                          />
                          {index === 3 ? (
                            <View style={styles.overlayImage}>
                              <Text
                                style={{ color: "white", fontSize: 20 }}
                              >{`+${product.image.length - 3}`}</Text>
                            </View>
                          ) : null}
                        </TouchableOpacity>
                      </View>
                    );
                  }
                }
              })
            : null}
        </View>
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
  btnChooseImage: {
    marginTop: 30,
    height: 30,
    backgroundColor: "#F9B500",
    width: 100,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  overlayImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,.5)",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
});
