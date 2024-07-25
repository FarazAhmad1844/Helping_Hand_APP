import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    Touchable,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useState, useLayoutEffect } from "react";
  import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    updateDoc,
    where,
  } from "firebase/firestore";
  import { auth, db } from "../../../firebase/firebase.config";
  import { TextInput } from "react-native-paper";
  import User from "../../components/User";
  import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
  
  const DonorDonationsScreen = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [name, setName] = useState(null);
    const [type, setType] = useState("Donor");
    useLayoutEffect(() => {
      const ref = collection(db, "posts");
      const q = query(ref, orderBy("timestamp", "asc"));
      onSnapshot(q, (products) =>
        setData(
          products.docs.map((product) => ({
            id: product.id,
            data: product.data(),
          }))
        )
      );
      // console.log(data);
    }, [name]);
  
    const updateDetails = async (id, status) => {
      const washingtonRef = doc(db, "posts", id);
  
      // Set the "capital" field of the city 'DC'
      await updateDoc(washingtonRef, {
        status: status,
      }).then(() => {
        alert(status + " Successfully.");
      });
    };
    const deletePost=async(id)=>{
      await deleteDoc(doc(db, "posts", id))
      .then(()=>{
        alert("Post has been deleted successfully");
      });
    }
    return (
      <KeyboardAwareScrollView>
        
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
        </View>
       
  
        <ScrollView vertical showsVerticalScrollIndicator={false}>
          {data.map((item, key) => (
            <View key={key}>
              {item.data.status==='Completed' && item.data.userId === auth.currentUser.uid && (
                <View
                  key={key}
                  style={{
                    backgroundColor: "#00A86B",
                    margin: 5,
                    padding: 5,
                    borderRadius: 10,
                  
                  }}
                >
                 <Text
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      marginHorizontal: 10,
                      fontSize: 22,
                      marginVertical: 10,
                    }}
                  >
                    {item.data.title}
                  </Text>
                  <Image
                    source={{
                      uri: item.data.picture,
                    }}
                    style={{
                      height: 250,
                      width: "100%",
                    
                    }}
                  />
                 
                  <View
                    style={{
                     
                      marginBottom:2,
                      backgroundColor:'white',
                      padding:10
                   
                    }}
                  >
                    <Text
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        textAlign: "justify",
                        marginTop:10,
                        marginBottom:10


                      }}
                    >
                      {item.data.description}
                    </Text>
                    <View
                    style={
                      {
                        marginBottom:10,
                        flexDirection:'row',
                        marginHorizontal:50
                      
                      }
                    }>
                <User id="WC8SHPFlNk0xIiIdEqh0" />
                <TouchableOpacity
                 style={{
              backgroundColor: "darkgreen",
              justifyContent: "center",
              alignItems: "center",
              fontWeight:'bold',
              marginLeft:60,
              marginTop:20,
              height: 70,
              borderRadius: 12,
              padding: 5,
            width:80,
            

              
              shadowColor: "black",
              shadowOpacity: 0.3,
              elevation: 6,
              shadowRadius: 15,
              shadowOffset: { width: 56, height: 20 },
            }}
           
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                padding:2,
                fontSize:12
              
              }}
            >
              Completed
            </Text>
        </TouchableOpacity>
                </View>
                  </View>
                
           
                </View>
              )}
            
            </View>
          ))}
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  };
  
  export default DonorDonationsScreen;
  
  const styles = StyleSheet.create({});
  