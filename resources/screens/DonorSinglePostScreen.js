import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase.config';

const DonorSinglePostScreen = ({ navigation, route }) => {
    const [name, setName] = useState(null);
    const [price, setPrice] = useState(null);
    const [picture, setPicture] = useState(null);
    const [by, setBy] = useState(null);
    const [des, setDes] = useState(null);
    useLayoutEffect(() => {
        const readData = async () => {
            const docRef = doc(db, "posts", route.params.id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setName(docSnap.data().title);
                setPrice(docSnap.data().price);
                setPicture(docSnap.data().picture);
                setBy(docSnap.data().userId);
                setDes(docSnap.data().description);
                
            }
        }
        readData();
    }, []);
    const updateDetails = async (id, status) => {
        const washingtonRef = doc(db, "posts", id);
    
        // Set the "capital" field of the city 'DC'
        await updateDoc(washingtonRef, {
          status: status,
        }).then(() => {
          alert(status + " Successfully.");
        });
      };
    return (
        <View>
            <Image
                source={{
                    uri: picture,
                }}
                style={{
                    width: "100%",
                    height: 260,

                }}
            />
            <View style={{

                backgroundColor: 'white',
                padding: 10,
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-evenly',
            }}>
                <Text
                style={{
                  marginRight:250,
                  fontWeight:'bold',
                  fontSize:20,
                  color:'green'
                }}>
                    {name}
                </Text>
               
            </View>
            <View>
            <Text style={{
                  alignContent:"center",
                  justifyContent:'center',
                  marginHorizontal:20,
                }}>
                    {des}
                </Text>
            </View>
          
        </View>
    )
}

export default DonorSinglePostScreen

const styles = StyleSheet.create({})