import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { auth, db } from "../../firebase/firebase.config";
import { TextInput } from "react-native-paper";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const LoginScreen = ({ navigation,route }) => {
  // backend area

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  // loginfunction

  const loginUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        checkOtherInformation();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  const checkOtherInformation = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && docSnap.data().status === "Active") {
     
      if (docSnap.data().type === "Admin") {
        navigation.replace("Dashboard");
      }
      if (docSnap.data().type === "Needy") {
        navigation.replace("Home");
      }

      if (
        docSnap.data().type === "Donor" ||
        docSnap.data().type === "Volunteer"
      ) {
        navigation.replace("Donor Home", {
          type: docSnap.data().type,
        });
      }
    } else {j
      signOut(auth).then(() => {
        alert(
          "Sorry! Your Account status is " +
            docSnap.data().status +
            ". So You Can't be Login"
        );
      });
    }
  };
  return (
    <KeyboardAwareScrollView
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
            uri: "https://png.pngtree.com/png-clipart/20220726/original/pngtree-smiling-woman-volunteer-giving-products-in-bag-to-beggar-man-png-image_8419611.png",
          }}
          style={{
            height: 150,
            width: 150,
          }}
        />
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            color: "#1dad81",
          }}
        >
          Helping Hand
        </Text>
      </View>
      <View
        style={{
          marginTop: 60,
        }}
      >
        <TextInput
          label="Email"
          placeholder="Enter Email"
          style={{
            marginHorizontal: 20,
            backgroundColor: "white",
            marginVertical: 10,

            shadowColor: "black",
            shadowOpacity: 0.3,
            elevation: 6,
            shadowRadius: 15,
            shadowOffset: { width: 56, height: 20 },
          }}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          label="Password"
          placeholder="Enter Password"
          secureTextEntry={true}
          style={{
            marginHorizontal: 20,
            backgroundColor: "white",
            marginBottom: 25,


            shadowColor: "black",
            shadowOpacity: 0.3,
            elevation: 3,
            shadowRadius: 3,
            shadowOffset: { width: 56, height: 20 },
          }}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#1dad81",
            justifyContent: "center",
            alignItems: "center",
            height: 45,
            width: "65%",
            marginBottom: 10,

            borderRadius: 12,
            shadowColor: "black",
            shadowOpacity: 0.3,
            elevation: 3,
            shadowRadius: 3,
            shadowOffset: { width: 56, height: 20 },
          }}
          onPress={loginUser}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#1E88E5",
            height: 45,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 12,
            width: "65%",

            borderRadius: 12,
            shadowColor: "black",
            shadowOpacity: 0.3,
            elevation: 6,
            shadowRadius: 15,
            shadowOffset: { width: 56, height: 20 },
          }}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginVertical: 10,
          }}
        >
          {route.params.type !=='Admin' && (
            <TouchableOpacity
            style={{
              backgroundColor: "purple",
              height: 30,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 12,
              width: "40%",
              marginHorizontal:10,

              borderRadius: 12,
              shadowColor: "black",
              shadowOpacity: 0.3,
              elevation: 6,
              shadowRadius: 15,
              shadowOffset: { width: 56, height: 20 },
            }}
            onPress={() => navigation.navigate("Login as Admin",{
              type:'Admin'
            })}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              Login as Admin
            </Text>
          </TouchableOpacity>
          )}
          {(route.params.type!=='Donor') && (
            <TouchableOpacity
            style={{
              backgroundColor: "purple",
              height: 30,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 12,
              width: "40%",
              marginHorizontal:10,

              borderRadius: 12,
              shadowColor: "black",
              shadowOpacity: 0.3,
              elevation: 6,
              shadowRadius: 15,
              shadowOffset: { width: 56, height: 20 },
            }}
            onPress={() => navigation.navigate("Login as Donor",{
              type:'Donor'
            })}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              Login as Donor
            </Text>
          </TouchableOpacity>
          )}
          {(route.params.type!=='Needy') && (
            <TouchableOpacity
            style={{
              backgroundColor: "purple",
              height: 30,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 12,
              width: "40%",
              marginRight:10,

              borderRadius: 12,
              shadowColor: "black",
              shadowOpacity: 0.3,
              elevation: 6,
              shadowRadius: 15,
              shadowOffset: { width: 56, height: 20 },
            }}
            onPress={() => navigation.navigate("Login",{
              type:'Needy'
            })}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              Login as Needy
            </Text>
          </TouchableOpacity>
          )}
         
        </View>
      </View>
      <TouchableOpacity
        style={{
          height: 45,
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 20,
          borderRadius: 20,
        }}
        onPress={() => navigation.navigate("Forget Password")}
      >
        <Text
          style={{
            color: "#1E88E5",
            // textDecorationLine: "underline",
          }}
        >
          Forgottten password?
        </Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
