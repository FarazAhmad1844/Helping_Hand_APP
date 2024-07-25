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
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import { TextInput } from "react-native-paper";

const UsersScreen = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [name, setName] = useState(null);
  useLayoutEffect(() => {
    const ref = collection(db, "users");
    const q = query(ref, where("type", "==", route.params.type));
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
  return (
    <View>
     <View style={{
      marginLeft:20,
      marginVertical:10,
    }}>
      <Text style={{
        fontWeight:'bold',
        fontSize:25,
        color:'#1dad81',
      }}>
        Our {route.params.type}s
      </Text>
    </View>
      
  
      <View>
        <TextInput
        label="Search..."
        placeholder="Search..."
        value={name}
        onChangeText={(text)=>setName(text)}
        style={{
            backgroundColor:'#eee',
            marginHorizontal:'5%'
        }}
         />
      </View>
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        {data.map((item, key) => (
         <View key={key}>
            {name===null && (
                <TouchableOpacity
            key={key}
            style={{
              backgroundColor: "#fff",
              margin: 5,
              padding: 10,
              borderRadius: 10,
            }}
            onPress={() =>
              navigation.navigate("User Details", {
                id: item.id,
              })
            }
          >
            <Image
              source={{
                uri: item.data.picture,
              }}
              style={{
                height: 250,
                width: "100%",
              }}
            />
            <View style={{
                flexDirection:'row',
                justifyContent:'space-evenly',
                backgroundColor:'#1dad81',
                paddingVertical:15,

            }}>
              <Text style={{
                color:'white',
                fontWeight:'bold',
              }}>{item.data.status}</Text>
              <Text  style={{
                color:'white',
                fontWeight:'bold',
              }}>{item.data.name}</Text>
              <Text  style={{
                color:'white',
                fontWeight:'bold',
              }}>{item.data.type}</Text>
            </View>
          </TouchableOpacity>
            )}
            {name!==null && item.data.name.toString().toLowerCase().includes(name.toString().toLowerCase()) && (
                <TouchableOpacity
            key={key}
            style={{
              backgroundColor: "#fff",
              margin: 5,
              padding: 10,
              borderRadius: 10,
            }}
            onPress={() =>
              navigation.navigate("User Details", {
                id: item.id,
              })
            }
          >
            <Image
              source={{
                uri: item.data.picture,
              }}
              style={{
                height: 250,
                width: "100%",
              }}
            />
            <View style={{
                flexDirection:'row',
                justifyContent:'space-evenly',
                backgroundColor:'#1dad81',
                paddingVertical:15,

            }}>
              <Text style={{
                color:'white',
                fontWeight:'bold',
              }}>{item.data.status}</Text>
              <Text  style={{
                color:'white',
                fontWeight:'bold',
              }}>{item.data.name}</Text>
              <Text  style={{
                color:'white',
                fontWeight:'bold',
              }}>{item.data.type}</Text>
            </View>
          </TouchableOpacity>
            )}
         </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default UsersScreen;

const styles = StyleSheet.create({});
