import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useLayoutEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebase.config";

const SingleUserScreen = ({ navigation, route }) => {
  const [name, setName] = useState(null);
  const [picture, setPicture] = useState(null);
  const [status, setStatus] = useState(null);
  const [type, setType] = useState(null);
  useLayoutEffect(() => {
    // alert(route.params.cur);
    const readData = async () => {
      const docRef = doc(db, "users", route.params.id);
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
  const [currentUserType, setCurrentUserType] = useState(null);
  // const [password, setPassword] = useState(null);
  useLayoutEffect(() => {
    const readData = async () => {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
      
        setCurrentUserType(docSnap.data().type);
      }
    };
    readData();
  }, [currentUserType]);
  const changeUserStatus = async (_status) => {
    const ref = doc(db, "users", route.params.id);

    await updateDoc(ref, {
      status: _status,
    }).then(() => {
      alert(type + " " + _status + " Successfully.");
    });
    setStatus(null);
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
      <View
        style={{
          backgroundColor: "lightgrey",
          padding: 10,
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-evenly",

          shadowColor: "black",
          shadowOpacity: 0.3,
          elevation: 6,
          shadowRadius: 15,
          shadowOffset: { width: 56, height: 20 },
        }}
      >
        <Text>{name}</Text>
        <Text>{type}</Text>
      </View>
      <View
        style={{
          marginHorizontal: 15,
        }}
      >
        <Text
          style={{
            color: "black",
            fontSize: 20,
            textDecorationLine: "underline",
            margin: 10,
          }}
        >
          Contact Details
        </Text>
        <View>
          <Text
            style={{
              color: "black",
              fontSize: 14,
              marginHorizontal: 10,
            }}
          >
            +92-333-333333
          </Text>
          <Text
            style={{
              color: "black",
              fontSize: 13,
              marginHorizontal: 10,
            }}
          >
            Gujrat / Kalra Khasa / 50700
          </Text>
          <Text
            style={{
              color: "gray",
              fontSize: 13,
              marginHorizontal: 10,
            }}
          >
            GIMS, Kalra Khasa near Mussa Petroleum G.T road Gujrat
          </Text>
        </View>
      </View>
      {currentUserType === "Admin" && (
        <View>
          {status === "Active" && (
            <TouchableOpacity
              style={{
                backgroundColor: "red",
                alignItems: "center",
                justifyContent: "center",

                height: 45,
                width: "50%",
                marginHorizontal: "26%",
                marginVertical: 10,
                borderRadius: 12,

                shadowColor: "black",
                shadowOpacity: 0.3,
                elevation: 6,
                shadowRadius: 15,
                shadowOffset: { width: 56, height: 20 },
              }}
              onPress={() => changeUserStatus("Blocked")}
            >
              <Text
                style={{
                  color: "white",
                }}
              >
                Block
              </Text>
            </TouchableOpacity>
          )}
          {status !== "Active" && (
            <TouchableOpacity
              style={{
                backgroundColor: "#1dad81",
                alignItems: "center",
                justifyContent: "center",

                height: 45,
                width: "50%",
                marginHorizontal: "26%",
                marginVertical: 10,
                borderRadius: 12,

                shadowColor: "black",
                shadowOpacity: 0.3,
                elevation: 6,
                shadowRadius: 15,
                shadowOffset: { width: 56, height: 20 },
              }}
              onPress={() => changeUserStatus("Active")}
            >
              <Text
                style={{
                  color: "white",
                }}
              >
                Activate
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default SingleUserScreen;

const styles = StyleSheet.create({});
