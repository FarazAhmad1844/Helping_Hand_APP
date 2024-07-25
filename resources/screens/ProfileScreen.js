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
import { auth, db, storage } from "../../firebase/firebase.config";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { ScrollView } from "react-native-gesture-handler";


const ProfileScreen = ({ navigation }) => {
  const [email, setEmail] = useState(auth.currentUser.email);
  const [fullName, setFullName] = useState(null);
  const [picture, setPicture] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsyvn5LNn05gPRp3lXI6a6IKyKNBwvQNnskQ&usqp=CAU"
  );
  const [image, setImage] = useState(null);
  const [type, setType] = useState(null);
  const [address, setAddress] = useState(null);
  
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
      
        
      }
    };
    readData();
  }, []);

  const updateInformation = async () => {
    // Add a new document in collection "cities"
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      name: fullName,
      picture: picture,
      status: "Active",
      type:type,
      address:address
    }).then(() => {
      alert("Updated Successfully");
      navigation.replace("Profile");
    });
  };
  const updateType = async (type) => {
    // Set the "capital" field of the city 'DC'
    const washingtonRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(washingtonRef, {
      type: type,
    }).then(() => {   
      alert("Updated Successfully");
      signOut(auth).then(() => {
        alert("You Need to Login again.");
        navigation.replace("Login");
      });
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
        marginTop: 30,
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
        <Text
          style={{
            fontSize: 27,
            fontWeight: "bold",
            color: "black",
            marginTop:5
          }}
        >
        {fullName}
        </Text>
        <Text
        style={{
          marginTop:5,
          color:'#1E88E5'
          
        }}>
        </Text>
      
      </TouchableOpacity>
     
      <View
        style={{
          marginTop: 20,
        }}
      >
         <TextInput
         
          style={{
            marginHorizontal: 20,
            backgroundColor: "white",
            marginVertical: 15,
          fontWeight:'bold'
          }}
          onChangeText={(text) => setType(text)}
           value={type}
           editable={false} 
        />
        <TextInput
          label="Full Name"
          placeholder="Enter your full name"
          style={{
            marginHorizontal: 20,
            backgroundColor: "white",
            marginBottom: 15,
          }}
          onChangeText={(text) => setFullName(text)}
          value={fullName}
        />
    
        <TextInput
          label="Email"
          placeholder="Enter your Email"
          style={{
            marginHorizontal: 20,
            backgroundColor: "white",
            marginVertical: 15,
          }}
          onChangeText={(text) => setEmail(text)}
          value={email}
         
        />
           <TextInput
          label="Address"
          placeholder="Enter Your Address"
          style={{
            marginHorizontal: 20,
            backgroundColor: "white",
            marginVertical: 15,
          }}
          onChangeText={(text) => setAddress(text)}
           value={address}
        />
          
    
      </View>

      <View>
        <TouchableOpacity
          style={{
            backgroundColor: "#1dad81",
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 64,
            borderRadius: 10,
            marginTop: 10,
            marginBottom:10,
            height: 45,
            width: "65%",
            

            borderRadius: 12,
            shadowColor: "black",
            shadowOpacity: 0.3,
            elevation: 6,
            shadowRadius: 15,
            shadowOffset: { width: 56, height: 20 },
          }}
          onPress={updateInformation}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            Update Profile
          </Text>
        </TouchableOpacity>
        {type === "Needy" && (
          <TouchableOpacity
            style={{
              backgroundColor: "#1dad81",
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 64,
              borderRadius: 10,
              marginTop: 10,
              height: 45,
              width: "65%",

              borderRadius: 12,
              shadowColor: "#1E88E5",
              shadowOpacity: 0.3,
              elevation: 6,
              shadowRadius: 15,
              shadowOffset: { width: 56, height: 20 },
            }}
            onPress={() => updateType("Donor")}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              Switch to Donor Account
            </Text>
          </TouchableOpacity>
        )}
        {type === "Donor" && (
          <TouchableOpacity
            style={{
              backgroundColor: "blue",
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 64,
              borderRadius: 10,
              marginTop: 10,
              height: 45,
              width: "65%",

              borderRadius: 12,
              shadowColor: "black",
              shadowOpacity: 0.3,
              elevation: 6,
              shadowRadius: 15,
              shadowOffset: { width: 56, height: 20 },
            }}
            onPress={() => updateType("Needy")}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              Switch to Needy Account
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
