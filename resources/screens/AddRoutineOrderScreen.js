import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { auth, db } from "../../firebase/firebase.config";
import { addDoc, collection } from "firebase/firestore";
import User from "../components/User";
import RoutineOrderUser from "../components/RoutineOrderUser";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const AddRoutineOrderScreen = ({ navigation, route }) => {
  const [type, SetType] = useState(null);
  const [comment, setComment] = useState(null);

  
  const Addorder = async () => {
    if (comment && type) {
      const docRef = await addDoc(collection(db, "routineorder"), {
        volunteerId: auth.currentUser.uid,
        comment: comment,
        needyId: route.params.id,
        type: type,
        status: "Active",
      })
        .then(() => {
          alert("Routine order Added successfully."),
          navigation.replace("Routine Orders")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.errorMessage;
          alert(errorMessage);
        });
    } else {
      alert("fields can't be empty");
    }
  };
  return (
    <KeyboardAwareScrollView
      style={{
        marginTop: 10,
      }}
    >
      <View
        style={{
          alignItems: "center",
        }}
      >
        
     
        <RoutineOrderUser id={route.params.id} />
      
      </View>
      <View
        style={{
          marginTop: 10,
        }}
      >
        <TextInput
          label="type"
          placeholder="breakfast,lunch,diner or others"
          style={{
            marginHorizontal: 20,
            backgroundColor: "white",
            marginVertical: 15,
          }}
          onChangeText={(text) => SetType(text)}
        />
        <TextInput
          label="Comment"
          placeholder="Add comments"
          style={{
            marginHorizontal: 20,
            backgroundColor: "white",
            marginVertical: 15,
          }}
          onChangeText={(text) => setComment(text)}
        />
      </View>
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: "green",
            height: 45,
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 20,
            borderRadius: 20,
          }}
          onPress={() => Addorder()}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            Add
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AddRoutineOrderScreen;

const styles = StyleSheet.create({});
