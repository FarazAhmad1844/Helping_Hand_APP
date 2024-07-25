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
import { db } from "../../firebase/firebase.config";
import { useNavigation } from "@react-navigation/native";

const Users = (props) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  useLayoutEffect(() => {
    const ref = collection(db, "users");
    const q = query(ref, where("type", "==", props.type));
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
  return (
    <View>
      <Text
        style={{
          textAlign: "center",
          fontWeight:'bold',
          fontSize:20,
        }}
      >
        {props.type}s
      </Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((item, key) => (
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
                height: 100,
                width: 100,
              }}
            />
            <Text>{item.data.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: "#1dad81",
            height: 45,
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: "10%",
            marginBottom:40,
            borderRadius: 12,
            shadowColor: "black",
            shadowOpacity: 0.3,
            elevation: 6,

            shadowRadius: 15,
            shadowOffset: { width: 56, height: 20 },
            
          }}
          onPress={() => {
            navigation.navigate("Users", {
              type: props.type,
            });
          }}
        >
          <Text
            style={{
              color: "white",
              
                fontSize:15
            }}
          >
            View {props.type}s
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({});
