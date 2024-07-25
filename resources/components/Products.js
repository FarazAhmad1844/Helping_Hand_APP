import { Image, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';
import { useNavigation } from '@react-navigation/native';

const Products = () => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    useLayoutEffect(() => {
        const ref = collection(db, "products");
        onSnapshot(ref, (products) =>
            setData(
                products.docs.map((product) => ({
                    id: product.id,
                    data: product.data(),
                }))
            )
        ); 
       // console.log(data);
    }, []);
    return (
        <View>
            <Text>Products</Text>
            <ScrollView horizontal>


                {data.map((item, key) => (
                    
                    <TouchableOpacity key={key}  style={{
                        backgroundColor: 'grey',
                        margin: 5,
                        padding: 10,
                    }}
                    onPress = {()=> navigation.navigate("SingleProduct",{
                        id: item.id,
                    })
                }
                    >
                        <Text>
                            {item.data.name}
                        </Text>
                        <Text>
                            {item.data.price}
                        </Text>
                        <Image
                            source={{
                                uri: item.data.picture
                            }}
                            style={{
                                height: 100,
                                width: 100,
                            }}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

export default Products

const styles = StyleSheet.create({})