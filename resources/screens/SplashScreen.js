import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const SplashScreen = ({ navigation }) => {
  return (
    <View
      style={{
        backgroundColor: "#1dad81",
        height: "100%",
      }}
    >
      <View
        style={{
          alignItems: "center",
          marginTop: 100,
        }}
      >
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9qD_DjoMEL8mwCquyIp7VC2P4ZiAAlPwn-871GT6ZQiMD_wg61l_qgwB3ZRH-tUqn76Y&usqp=CAU",
          }}
          style={{
            height: 200,
            width: 200,
            borderRadius: 100,

            shadowColor: "black",
            shadowOpacity: 0.3,
            elevation: 6,
            shadowRadius: 15,
            shadowOffset: { width: 56, height: 20 },
          }}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "darkgreen",
          height: 100,
          width: 150,
        
          justifyContent: "center",
          alignItems: "center",
          marginTop:190,
          marginLeft:100,
          borderRadius:12,

      
          shadowColor: "black",
          shadowOpacity: 0.3,
          elevation: 6,
          shadowRadius: 15,
          shadowOffset: { width: 56, height: 20 },
        }}
        onPress={() =>
          navigation.navigate("Login", {
            type: "Needy",
          })
        }
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 19,
            color: "white",
          }}
        >
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
