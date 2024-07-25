import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import User from "../../components/User";
import { collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebase.config";

const DonorRequestScreen = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  useLayoutEffect(() => {
    const ref = collection(db, "requests");
    const q = query(ref, where("postId",'==', route.params.id));
    onSnapshot(q, (products) =>
      setData(
        products.docs.map((product) => ({
          id: product.id,
          data: product.data(),
        }))
      )
    );
    // console.log(data);
  }, []);
  const acceptRequest=async(id,needyId)=>{
    const washingtonRef = doc(db, "requests", id);
    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, {
      status: "Accepted"
    })
    .then(()=>{
      changePostStatus(needyId);
    });
  }

  const changePostStatus=async(needyId)=>{
    const washingtonRef = doc(db, "posts", route.params.id);
    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, {
      status: "Running",
      needyId: needyId
    })
    .then(()=>{
      alert("You Accept Request");
      navigation.replace("Donor Posts",{
        type:'Donor'
      });
    })
  }
  return (
    <KeyboardAwareScrollView>
      <Text style={{
        textAlign:'center',
        fontWeight:'bold',
        margin:5,
        
      }}>All Needy Requests</Text>
      {data.map((item,key)=>(
        <View
        key={key}
        style={{
          backgroundColor: "white",
          padding: 10,
          margin: 5,
          justifyContent: "space-evenly",
          flexDirection: "row",
        }}
      >
        <View>
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              textAlign: "center",
              margin: 5,
            }}
          >
            Needy
          </Text>
          <User id={item.data.needyId} />
        </View>
       <View style={{
        justifyContent:'center',
        alignItems:'center'
       }}>
       <Text
              style={{
                color: "green",
                fontWeight: "bold",
              
              }}
            >
              {item.data.status}
            </Text>
        
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
                        donorId:auth.currentUser.uid,
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
       <TouchableOpacity
                 style={{
              backgroundColor: "green",
              justifyContent: "center",
              alignItems: "center",
              fontWeight:'bold',
              marginLeft:20,
              height: 45,
              borderRadius: 12,
              padding: 5,
            width:70,
            

              
              shadowColor: "black",
              shadowOpacity: 0.3,
              elevation: 6,
              shadowRadius: 15,
              shadowOffset: { width: 56, height: 20 },
            }}
            onPress={()=>acceptRequest(item.id,item.data.needyId)}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
              
              }}
            >
              Accept
            </Text>
        </TouchableOpacity>
     
       </View>
      </View>
      ))}
    </KeyboardAwareScrollView>
  );
};

export default DonorRequestScreen;

const styles = StyleSheet.create({});
