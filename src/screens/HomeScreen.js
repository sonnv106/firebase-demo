import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from "react-native";
import firestore from '@react-native-firebase/firestore'
const HomeScreen = ()=>{
    const [products, setProducts] = useState([])
    useEffect( ()=>{
        firestore().collection('products').onSnapshot((querySnapshot)=>{
            const newProducts = [];
            querySnapshot.forEach((documentSnapshot)=>{
                newProducts.push(documentSnapshot.data())
            })
            setProducts(newProducts)
        })
       
        return ()=>{
            setProducts
        }
      
    },[])
    const renderItem = ({item})=>{
        return(
            <TouchableOpacity >
                <Image source={item.image} style={{width: 50, height: 80, }} resizeMode='stretch'/>
                <Text>{item.name}</Text>
                <Text>{item.amount}</Text>
                <Text>{item.price}</Text>
            </TouchableOpacity>
        )
    }
    return(
        <View>
           <Text>Home</Text>
           <FlatList data={products} renderItem={renderItem} />

        </View>
    )
}
export default HomeScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        alignItems: "center",
        justifyContent: "center",
      },
})