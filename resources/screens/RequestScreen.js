import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import User from "../components/User";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase.config";

const RequestScreen = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  useLayoutEffect(() => {
    const ref = collection(db, "requests");
    const q = query(ref, where("needyId", "==", auth.currentUser.uid));
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
    <KeyboardAwareScrollView>
      {/* <Text style={{
        textAlign:'center',
        fontWeight:'bold',
        margin:5,
        
      }}>All Requests</Text> */}
      {data.map((item, key) => (
        <View
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
              Donor
            </Text>
            <User id={item.data.donorId} />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <TouchableOpacity
              style={{
                backgroundColor: "darkgreen",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                marginLeft: 20,
                height: 70,
                borderRadius: 12,
                padding: 5,
                width: 70,

                shadowColor: "black",
                shadowOpacity: 0.3,
                elevation: 6,
                shadowRadius: 15,
                shadowOffset: { width: 56, height: 20 },
              }}
              onPress={() => navigation.navigate("Donor Chat")}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Chat Now
              </Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={{
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("Donor Posts")}
            >
              <Text
                style={{
                  color: "blue",
                  marginTop: 5,
                  textDecorationLine: "underline",
                  marginLeft: 17,
                }}
              >
                View Post
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </KeyboardAwareScrollView>
  );
};

export default RequestScreen;

const styles = StyleSheet.create({});
