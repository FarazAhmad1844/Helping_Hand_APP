import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { auth, db } from "../../../firebase/firebase.config";
import { TextInput } from "react-native-paper";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Products from "../../components/Products";

const AddNewReportScreen = ({ navigation, route }) => {
  // backend area

const [description, setDescription] = useState(null);
  const [type, setType] = useState(null);


  const AddReport = async () => {
    if (type && description) {
      const docRef = await addDoc(collection(db, "reports"), {
        description: description,
        type:type,
        complainerId:auth.currentUser.uid,
        postId:route.params.post,
        sinnerId:route.params.sinner,
        status:"Pending",
        timestamp: serverTimestamp(),
      })
        .then(() => {
          alert("Post Added successfully.");
          alert(route.params.type);
          if (route.params.type !== "Needy") {
            navigation.replace("Donor Reports", {
              type: route.params.type,
            });
          } else {
            navigation.replace("Home", {
              type: "Needy",
            });
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.errorMessage;
          alert(errorMessage);
        });
    } else {
      alert("feilds can't be empty");
    }
  };
  return (
    <View
      style={{
        marginTop: 50,
      }}
    >
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/9875/9875129.png",
          }}
          style={{
            height: 250,
            width: 250,
            marginVertical: 5,
          }}
        />
      </View>

      <View
        style={{
          marginTop: 20,
        }}
      >
        <TextInput
          label="Type"
          placeholder="e.g Abusive, Other"
          style={{
            marginHorizontal: 20,
            backgroundColor: "white",
            marginVertical: 15,
          }}
          onChangeText={(text) => setType(text)}
        />
        <TextInput
          label="Description"
          placeholder="Write Short Description"
          style={{
            marginHorizontal: 20,
            backgroundColor: "white",
            marginVertical: 15,
          }}
          onChangeText={(text) => setDescription(text)}
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
          onPress={() => AddReport()}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            Add Report
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddNewReportScreen;

const styles = StyleSheet.create({});
