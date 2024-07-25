import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState, useLayoutEffect, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/firebase.config";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const UpdateScreen = ({ navigation, route }) => {
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [picture, setPicture] = useState(null);
  const [image, setImage] = useState(null);
  useLayoutEffect(() => {
    const readData = async () => {
      const docRef = doc(db, "products", route.params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setName(docSnap.data().name);
        setPrice(docSnap.data().price);
        setPicture(docSnap.data().picture);
      }
    };
    readData();
  }, []);
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
      const storageRef = ref(storage, "products/" + Date.now());
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
  }, [image,picture]);

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

  const updateData = async () => {
    const ref = doc(db, "products", route.params.id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(ref, {
      name: name,
      price: price,
      picture:picture,
    }).then(() => {
      alert("Record Updated Successfully.");
    });
  };
  return (
    <View>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={{
            uri: picture,
          }}
          style={{
            width: "100%",
            height: 260,
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          marginTop: 60,
        }}
      >
        <TextInput
          label="Name"
          placeholder="Enter Name"
          style={{
            marginHorizontal: 20,
            backgroundColor: "white",
            marginVertical: 15,
          }}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          label="Price"
          placeholder="Enter Price"
          style={{
            marginHorizontal: 20,
            backgroundColor: "white",
            marginVertical: 15,
          }}
          value={price}
          onChangeText={(text) => setPrice(text)}
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
          onPress={() => updateData()}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            Update Product
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UpdateScreen;

const styles = StyleSheet.create({});
