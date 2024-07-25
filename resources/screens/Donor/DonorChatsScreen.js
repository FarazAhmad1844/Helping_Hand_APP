import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import User from "../../components/User";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebase.config";

const DonorChatsScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  useLayoutEffect(() => {
    const ref = collection(db, "chats");
    const q=query(ref,where('donorId','==',auth.currentUser.uid))
    onSnapshot(q, (products) =>
      setData(
        products.docs.map((product) => ({
          id: product.id,
          data: product.data(),
        }))
      )
    );
    console.log(data);
  }, []);
  return (
    <View>
  
      <ScrollView>
      {data.map((item,key)=>(
        <View
          style={{
            backgroundColor: "white",
            padding: 10,
            margin: 5,
            borderRadius: 10,
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <User id={item.data.needyId} />
          <TouchableOpacity
            style={{
              backgroundColor: "darkgreen",
              justifyContent: "center",
              alignItems: "center",
              fontWeight:'bold',
              marginLeft:20,
              height: 70,
              borderRadius: 12,
              padding: 5,
            width:70,
            

              
              shadowColor: "black",
              shadowOpacity: 0.3,
              elevation: 6,
              shadowRadius: 15,
              shadowOffset: { width: 56, height: 20 },
            }}
            onPress={() => navigation.navigate("Donor Chat",{
                        postId:item.data.postId,
                        donorId:item.data.donorId,
                        needyId:item.data.needyId,
                      })}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
              
              }}
            >
              Chat Now
            </Text>
          </TouchableOpacity>
        </View>
      ))}
      
       
      </ScrollView>
      
    </View>
  );
};

export default DonorChatsScreen;

const styles = StyleSheet.create({});
