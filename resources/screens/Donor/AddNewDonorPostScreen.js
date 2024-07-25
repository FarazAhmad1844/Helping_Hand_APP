import { Image, StyleSheet, Text, View, TouchableOpacityss } from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase/firebase.config";
import { TextInput } from "react-native-paper";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { uploadBytesResumable } from "firebase/storage";
import { TouchableOpacity } from "react-native-gesture-handler";

const AddNewDonorPostScreen = ({ navigation, route }) => {
  // backend area

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [image, setImage] = useState(null);
  const [picture, setPicture] = useState(
    "https://championsports.pk/wp-content/uploads/2023/08/202202121851241080251172.jpg"
  );

  // loginfunction

  const AddProduct = async () => {
    if (title && description) {
      const docRef = await addDoc(collection(db, "posts"), {
        title: title,
        description: description,
        needyId: null,
        postsBy: route.params.type,
        status: "Active",
        userId: auth.currentUser.uid,
        timestamp: serverTimestamp(),
        picture:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIzadpgBVuIV4uGT0hW_b-iHx04bPmq7MeMsuNxpHLLQ&s",
      })
        .then(() => {
          alert("Post Added successfully.");
          alert(route.params.type);
          if (route.params.type !== "Needy") {
            navigation.replace("Donor Posts", {
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
    <View
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
            borderRadius:100,
            height: 200,
            width: 180,
          
    
          }}
        />
        {/* <Text
          style={{
            fontSize: 27,
            fontWeight: "bold",
            color: "black",
            marginTop:5
          }}
        >
        {fullName}
        </Text> */}
        {/* <Text
        style={{
          marginTop:5,
          color:'#1E88E5'
          
        }}>
          {type}
        </Text> */}
      
      </TouchableOpacity>
      {/* <View
        style={{
          alignItems: "center",
        }}
      >
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmSLz_xBVPbCSitH6IoB2VVm4iQoWfkfErrPoPqiB-QQ&s",
          }}
          style={{
            height: 250,
            width: 250,
            marginVertical: 5,
          }}
        />
      </View> */}

      <View
        style={{
          marginTop: 20,
        }}
      >
        <TextInput
          label="Title"
          placeholder="Write Post Title"
          style={{
            marginHorizontal: 20,
            backgroundColor: "white",
            marginVertical: 15,
          }}
          onChangeText={(text) => setTitle(text)}
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
          onPress={() => AddProduct()}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            Add Post
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddNewDonorPostScreen;

const styles = StyleSheet.create({});
