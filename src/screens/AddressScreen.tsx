import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import { useDispatch } from "react-redux";
import { loginUserWithPhoneNumber } from "../redux/api";
import RNFS from "react-native-fs";
import tinh_tp from "../hanhchinhvn/tinh_tp.json";
import quan_huyen from "../hanhchinhvn/quan_huyen.json";
import xa_phuong from "../hanhchinhvn/xa_phuong.json";
import DropDownPicker from "react-native-dropdown-picker";
import { User } from "../model/types";
const AddressScreen = ({ navigation, route }) => {
  const [confirm, setConfirm] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(true);
  let [rePassword, setRePassword] = useState("");
  const [userInfo, setUserInfo] = useState<User>({
    id: "",
    docId: "",
    email: "",
    password: "",
    isAdmin: false,
    active: false,
    name: "",
    phone: "",
    avatar: "",
    address: {
      city: "",
      district: "",
      street: "",
    },
    favoriteProduct: [],
    token: "",
    created_at: null,
    updated_at: null,
    dateOfBirth: null,
    lastActiveTime: null,
    status: null,
    sex: false,
    codeDiscount: [],
  });
  const [openCity, setOpenCity] = useState(false);
  const [valueCity, setValueCity] = useState();
  const [cityItems, setCityItems] = useState([]);

  const [openDistrict, setOpenDistrict] = useState(false);
  const [valueDistrict, setValueDistrict] = useState();
  const [districtItem, setDistrictItem] = useState([]);

  const [openWard, setOpenWard] = useState(false);
  const [valueWard, setValueWard] = useState();
  const [wardItems, setWardItems] = useState([]);

  const dispatch = useDispatch();
  const handleChangePhoneNumber = (text: string) => {};
  const handleChangeName = () => {};
  const handleChangePassword = (text: string) => {
    setUserInfo({
      ...userInfo,
      password: text,
    });
  };
  const handleChangeRepassword = (text: string) => {
    rePassword = text;
  };

  const handleRegister = () => {
    navigation.navigate("OtpScreen");
    // navigation.navigate('OtpScreen'  )
  };
  useEffect(() => {
    var arr = [];
    for (let i in tinh_tp) {
      arr.push(tinh_tp[i]);
    }
    for (let i = 0; i < arr.length; i++) {
      arr[i]["value"] = arr[i].slug;
      arr[i]["label"] = arr[i].name;
    }
    setCityItems(arr);
  }, [userInfo]);
  const onFilterDistrict = (districtCode: string) => {
    let quan = [];
    let arrDistrict = [];
    for (let i in quan_huyen) {
      arrDistrict.push(quan_huyen[i]);
    }
    for (let i of arrDistrict) {
      if (i.parent_code == districtCode) {
        quan.push(i);
      }
    }
    for (let i = 0; i < quan.length; i++) {
      quan[i]["value"] = quan[i].slug;
      quan[i]["label"] = quan[i].name;
    }
    setDistrictItem(quan);
  };
  const onFilterWard = (wardCode: string) => {
    let xa = [];
    let arrWard = [];
    for (let i in xa_phuong) {
      arrWard.push(xa_phuong[i]);
    }
    for (let i of arrWard) {
      if (i.parent_code == wardCode) {
        xa.push(i);
      }
    }
    for (let i = 0; i < xa.length; i++) {
      xa[i]["value"] = xa[i].slug;
      xa[i]["label"] = xa[i].name;
    }
    setWardItems(xa);
  };
  const getOTP = () => {
    const confirmation = loginUserWithPhoneNumber(userInfo.phone);

    setConfirm(confirmation);
  };
  return (
    <View style={{ flex: 1, padding: 10}}>
      
      <View>
        <Text>Đăng ký</Text>
      </View>
      <View style={{ flex: 1 }}>
        <View>
          <TextInput
            style={styles.inputName}
            placeholder="Name"
            onChangeText={handleChangeName}
          />
          <TextInput
            style={styles.inputName}
            placeholder="Phone number"
            onChangeText={handleChangePhoneNumber}
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.viewPassword}>
          <TextInput
            style={styles.inputPassword}
            placeholder="********"
            value={userInfo.password}
            onChangeText={handleChangePassword}
            secureTextEntry={passwordVisible}
          />
          <TouchableOpacity
            onPress={() => {
              setPasswordVisible(!passwordVisible);
            }}
            style={styles.btnHiddenPassword}
          >
            {passwordVisible ? (
              <Icon
                type="ionicon"
                name="eye-outline"
                tvParallaxProperties
                size={20}
              />
            ) : (
              <Icon
                type="ionicon"
                name="eye-off-outline"
                tvParallaxProperties
                size={20}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.viewPassword}>
          <TextInput
            style={styles.inputPassword}
            placeholder="********"
            value={userInfo.password}
            onChangeText={handleChangePassword}
            secureTextEntry={passwordVisible}
          />
          <TouchableOpacity
            onPress={() => {
              setPasswordVisible(!passwordVisible);
            }}
            style={styles.btnHiddenPassword}
          >
            {passwordVisible ? (
              <Icon
                type="ionicon"
                name="eye-outline"
                tvParallaxProperties
                size={20}
              />
            ) : (
              <Icon
                type="ionicon"
                name="eye-off-outline"
                tvParallaxProperties
                size={20}
              />
            )}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", padding: 10, width: "100%" }}>
          <View>
            <DropDownPicker
              open={openCity}
              value={valueCity}
              items={cityItems}
              setOpen={setOpenCity}
              setValue={setValueCity}
              setItems={setCityItems}
              style={{ width: 100, padding: 0, margin: 0 }}
              onSelectItem={(item: any) => {
                setUserInfo({
                  ...userInfo,
                  address: {
                    city: item.value,
                    district: userInfo.address.district,
                    street: userInfo.address.street,
                  },
                });
                onFilterDistrict(item.code);
              }}
              onPress={() => setOpenDistrict(false)}
            />
          </View>
          <View>
            <DropDownPicker
              open={openDistrict}
              value={valueDistrict}
              items={districtItem}
              setOpen={setOpenDistrict}
              setValue={setValueDistrict}
              setItems={setDistrictItem}
              style={{ width: 150 }}
              onPress={() => setOpenCity(false)}
              dropDownContainerStyle={{ width: "100%" }}
              onSelectItem={(item: any) => {
                setUserInfo({
                  ...userInfo,
                  address: {
                    city: userInfo.address.city,
                    district: item.value,
                    street: userInfo.address.street,
                  },
                });
                onFilterWard(item.code);
              }}
            />
          </View>
          <DropDownPicker
            open={openWard}
            value={valueWard}
            items={wardItems}
            setOpen={setOpenWard}
            setValue={setValueWard}
            setItems={setWardItems}
            style={{ width: 100 }}
            onPress={() => setOpenDistrict(false)}
            dropDownContainerStyle={{ width: "100%" }}
            onSelectItem={(item: any) => {
              setUserInfo({
                ...userInfo,
                address: {
                  city: userInfo.address.city,
                  district: userInfo.address.district,
                  street: item.value,
                },
              });
            }}
          />
        </View>
        <TextInput
          style={styles.inputName}
          placeholder="Nhập số nhà, tên đường"
          onChangeText={handleChangePhoneNumber}
        />
        <TouchableOpacity style={styles.btnSignIn} onPress={handleRegister}>
          <Text style={styles.txtBtnSignIn}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default AddressScreen;
const styles = StyleSheet.create({
  inputName: {
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
  inputPassword: {
    borderColor: "#F7F3E3",
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    flex: 1,
    height: 50,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FBFBFB",
    shadowColor: "#000",
  },
  contentContainerStyle: {
    paddingHorizontal: 20,
  },
  btnHiddenPassword: {
    padding: 10,
    height: "100%",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 100,
  },
  viewPassword: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FBFBFB",
    borderRadius: 40,
    marginTop: 20,
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
