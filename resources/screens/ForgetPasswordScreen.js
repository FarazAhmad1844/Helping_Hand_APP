import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../../firebase/firebase.config'
import { TextInput } from 'react-native-paper'
import { sendPasswordResetEmail } from 'firebase/auth'

const ForgetPasswordScreen = ({ navigation }) => {
    // backend area

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    // loginfunction

    const forgetPassword = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Password Reset Email Sent Successfully.");
                navigation.replace("Login");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });
    }
    return (
        <View style={{
            marginTop: 100,
        }}>
            <View style={{
                alignItems: 'center'
            }}>
                <Image
                    source={{
                        uri: 'https://png.pngtree.com/png-clipart/20220726/original/pngtree-smiling-woman-volunteer-giving-products-in-bag-to-beggar-man-png-image_8419611.png'
                    }}

                    style={{
                        height: 150,
                        width: 150,
                    }}
                />
                <Text style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    color: '#1dad81'
                }}>
                    Helping Hand
                </Text>

            </View>
            <View style={{
                marginTop: 60,
            }}>
                <TextInput
                    label="Email"
                    placeholder="Enter Email"
                    style={{
                        marginHorizontal: 20,
                        backgroundColor: 'white',
                        marginVertical: 15,
                        borderRadiusTop:40
                    }}
                    onChangeText={(text) => setEmail(text)}
                />

            </View>
            <View>
            <TouchableOpacity
          style={{
            backgroundColor: "#1dad81",
            justifyContent: "center",
            alignItems: "center",
            height: 45,
            width:'65%',
            marginLeft:62,

            borderRadius: 12,
            shadowColor: "black",
            shadowOpacity: 0.3,
            elevation: 6,
            shadowRadius: 15,
            shadowOffset: { width: 56, height: 20 },
          }}
          onPress={forgetPassword}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            Reset Password
          </Text>
        </TouchableOpacity>
               
            </View>
        </View>
    )
}

export default ForgetPasswordScreen

const styles = StyleSheet.create({})