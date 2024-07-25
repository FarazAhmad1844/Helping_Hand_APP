import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacityBase,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState, useLayoutEffect, useEffect } from "react";
import { TextInput } from "react-native-paper";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db, storage } from "../../../firebase/firebase.config";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { ScrollView } from "react-native-gesture-handler";

const AddNewNeedyScreen = ({ navigation }) => {
  const [email, setEmail] = useState(auth.currentUser.email);
  const [fullName, setFullName] = useState(null);
  const [picture, setPicture] = useState(
    "https://propta.com/wp-content/uploads/2021/12/extension-registration-form-icon-png-1-1.png"
  );
  const [image, setImage] = useState(null);
  const [type, setType] = useState(null);
  const [contact, setContact] = useState(null);
  const [address, setAddress] = useState(null);
  const [cnic, setCNIC] = useState(null);
  // const [password, setPassword] = useState(null);
  useLayoutEffect(() => {
    const readData = async () => {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setFullName(docSnap.data().name);
        setPicture(docSnap.data().picture);
        setType(docSnap.data().type);
        setAddress(docSnap.data().address);
        setContact(docSnap.data().contact);
        setCNIC(docSnap.data().cnic);
      }
    };
    readData();
  }, []);
  const updateInformation = async () => {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "users"), {
      name: fullName,
      picture: picture,
      status: "Active",
      type: "Needy",
      contact: contact,
      address: address,
      cnic: cnic,
    }).then(() => {
      alert("Needy Added  Successfully");
    });
  };

  useEffect(() => {
    const uploadImage = async () => {
      // set Matadata of image
      // Create the file metadata
      /** @type {any} */
      const metadata = {
        contentType: "image/jpeg",
      };

      // convert image into blob image
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", image, true);
        xhr.send(null);
      });

      // Now upload image on storage
      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, "profiles/" + Date.now());
      const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setPicture(downloadURL);
          });
        }
      );
    };
    if (image !== null) {
      uploadImage();
      setImage(null);
    }
  }, [image, picture]);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView
      style={{
        marginTop: 50,
      }}
    >
      <TouchableOpacity
        onPress={pickImage}
        style={{
          alignItems: "center",
        }}
      >
        <Image
          source={{
            uri: picture,
          }}
          style={{
            height: 150,
            width: 150,
          }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "black",
          }}
        >
          Profile
        </Text>
      </TouchableOpacity>
      <View
        style={{
          marginTop: 35,
        }}
      >
        <TextInput
          label="Full Name"
          placeholder="Enter your full name"
          style={{
            marginHorizontal: 20,
            backgroundColor: "white",
            marginVertical: 10,
          }}
          onChangeText={(text) => setFullName(text)}
        />
        <TextInput
          label="Needy"
          style={{
            marginHorizontal: 20,
            backgroundColor: "white",
            marginVertical: 10,
          }}
          editable={false}
        />
        <TextInput
          label="Contact No"
          placeholder="Enter your contact no"
          style={{
            marginHorizontal: 20,
            backgroundColor: "white",
            marginVertical: 10,
          }}
          onChangeText={(text) => setContact(text)}
        />
        <TextInput
          label="Address"
          placeholder="Enter your Address"
          style={{
            marginHorizontal: 20,
            backgroundColor: "white",
            marginVertical: 10,
          }}
          onChangeText={(text) => setAddress(text)}
        />
        <TextInput
          label="CNIC"
          placeholder="Enter your CNIC"
          style={{
            marginHorizontal: 20,
            backgroundColor: "white",
            marginVertical: 10,
          }}
          onChangeText={(text) => setCNIC(text)}
        />
      </View>

      <View>
        <TouchableOpacity
          style={{
            backgroundColor: "black",
            height: 45,
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 50,
            borderRadius: 10,
            marginTop: 30,
          }}
          onPress={updateInformation}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            Add Needy
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddNewNeedyScreen;

const styles = StyleSheet.create({});
