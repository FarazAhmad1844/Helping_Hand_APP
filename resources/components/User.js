import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useLayoutEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import { useNavigation } from "@react-navigation/native";

const User = (props) => {
    const navigation=useNavigation();
  const [name, setName] = useState(null);
  const [picture, setPicture] = useState(null);
  const [status, setStatus] = useState(null);
  const [type, setType] = useState(null);
  useLayoutEffect(() => {
    // alert(props.id)
    const readData = async () => {
      const docRef = doc(db, "users", props.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setName(docSnap.data().name);
        setPicture(docSnap.data().picture);
        setStatus(docSnap.data().status);
        setType(docSnap.data().type);
      }
    };
    readData();
  }, [status]);
  
  return (
    <View style={{
        alignItems:'center'
    }}>
      <Image
        source={{
          uri: picture,
        }}
        style={{
          width: 45,
          height: 45,
          borderRadius:45,
          borderRadius: 12,

            shadowColor: "black",
            shadowOpacity: 0.3,
            elevation: 6,
            shadowRadius: 15,
            shadowOffset: { width: 56, height: 20 },
        }}
      />
      <View
        style={{
        //   backgroundColor: "white",
        //   padding: 10,
        //   flexDirection: "row",
          alignItems:'center',
        //   width: "100%",
        //   justifyContent: "space-evenly",
        }}
      >
        <Text>{name}</Text>
        <Text style={{
          color:'black',
            fontWeight:'bold'
        }}>{type} - {status}</Text>
       
        <TouchableOpacity
            style={{
            
              justifyContent: "center",
              alignItems: "center",
             borderRadius:5,
              padding:7,
              backgroundColor:'#1dad81',
            marginTop:6,  
            shadowColor: "black",
            shadowOpacity: 0.3,
            elevation: 9,
            shadowRadius: 15,
            shadowOffset: { width: 56, height: 20 },

            
            }}
            onPress={() =>
                navigation.navigate("User Details",{
                    id:props.id
                })
            }
          >
          
            <Text
              style={{
                color: "white",
                
              }}>
              View Profile
            </Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({});
