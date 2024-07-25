import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useLayoutEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import { useNavigation } from "@react-navigation/native";


const RoutineOrderUser = (props) => {
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
          width: 200,
          height: 200,
         marginBottom:20,
          borderRadius: 12,

        }}
      />
      <View
        style={{
          backgroundColor: "grey",
          padding: 15,
          flexDirection: "row",
          alignItems:'center',
          width: "100%",
          justifyContent: "space-evenly",
         
        }}
      >
        <Text
        style={{
          color:'white',
            fontWeight:'bold'
        }}>{name}</Text>
        <Text style={{
          color:'blue',
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
                height:20,
                width:60,
                fontWeight:'bold'
              }}>
               Profile
            </Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

export default RoutineOrderUser;

const styles = StyleSheet.create({});
