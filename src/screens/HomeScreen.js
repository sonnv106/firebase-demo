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
            <TouchableOpacity style={{ height: 80, backgroundColor: '#F9DBBD', borderRadius: 20, padding: 10, margin: 10}}  >
               
                <Text>{item.name}</Text>
                <Text>{item.amount}</Text>
                <Text>{item.price}</Text>
            </TouchableOpacity>
        )
    }
    return(
        <View>
        
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