import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacityBase,
    View,
    TouchableOpacity,
  } from "react-native";
  import React, { useState } from "react";
  import { TextInput } from "react-native-paper";
  import { createUserWithEmailAndPassword } from "firebase/auth";
  import { auth, db } from "../../firebase/firebase.config";
  import { doc, setDoc } from "firebase/firestore";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
  
  const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState(null);
    const [fullName, setFullName] = useState(null);
    const [password, setPassword] = useState(null);
    const [contact, setContact] = useState(null);
    const [address, setAddress] = useState(null);
    const [postal, setPostal] = useState(null);
    const [type, setType] = useState(null);
    const [cnic, setCNIC] = useState(null);

  
    const Signup = () => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          alert("User Signed-up Successfully.");
          addOtherInformation();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
          // ..
        });
    };
  
    const addOtherInformation=async() => {
      // alert(auth.currentUser.uid+' '+fullName);
      // Add a new document in collection "cities"
      await setDoc(doc(db, "users",auth.currentUser.uid), {
        name: fullName,
        picture:"https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
        status: "Active",
        type: type,
        postalcode: postal,
        contact: contact,
        address:address,
        cnic:cnic,

      }).then(() => {
        navigation.replace("Home");
      });
    };
    return (
      <KeyboardAwareScrollView
    >
      <View
        style={{
          marginTop:15,
        }}
     >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Image
            source={{
              uri: "https://cdni.iconscout.com/illustration/premium/thumb/sign-up-6333618-5230178.png?f=webp",
            }}
            style={{
              height: 200,
              width: 200,
            }}
          />
        </View>
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
              marginBottom: 10,

            }}
            onChangeText={(text) => setFullName(text)}
          />
              <TextInput
            label="Account Type"
            placeholder="Donor/Volunteer/Needy"
            style={{
              marginHorizontal: 20,
              backgroundColor: "white",
              marginBottom: 10,

            }}
            onChangeText={(text) => setType(type)}
          />
           <TextInput
            label="Contact No"
            placeholder="Enter your Number"
            style={{
              marginHorizontal: 20,
              backgroundColor: "white",
              marginBottom: 10,
            }}
            onChangeText={(text) => setContact(text)}
          />
      
                <TextInput
            label="Address"
            placeholder="City/Area/Street"
            style={{
              marginHorizontal: 20,
              backgroundColor: "white",
              marginBottom: 10,
            }}
            onChangeText={(text) => setAddress(text)}
          />
                <TextInput
            label="Postal Code"
            placeholder="Enter your Postal Code"
            style={{
              marginHorizontal: 20,
              backgroundColor: "white",
              marginBottom: 10,
            }}
            onChangeText={(text) => setPostal(text)}
          />
               <TextInput
            label="CNIC NO"
            placeholder="XXXXX-XXXXXX-X"
            style={{
              marginHorizontal: 20,
              backgroundColor: "white",
              marginBottom: 10,
            }}
            onChangeText={(text) => setCNIC(text)}
          />
          <TextInput
            label="Email"
            placeholder="Enter your Email"
            style={{
              marginHorizontal: 20,
              backgroundColor: "white",
              marginBottom: 10,
            }}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            label="Password"
            placeholder="Enter password"
            style={{
              marginHorizontal: 20,
              backgroundColor: "white",
              marginBottom: 10,
            }}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
          
        </View>
  
        <View>
          <TouchableOpacity
            style={{
              backgroundColor:'#1E88E5',
              height: 45,
              alignItems: "center",
              justifyContent: "center",
              marginHorizontal: 50,
              borderRadius: 10,
              marginTop: 10,
              marginBottom:25,
            }}
            onPress={Signup}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      </KeyboardAwareScrollView>
    );
  };
  
  export default SignupScreen;
  
  const styles = StyleSheet.create({});
  