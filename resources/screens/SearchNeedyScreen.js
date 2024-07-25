import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { TextInput } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";

const SearchNeedyScreen = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [name, setName] = useState(null);
  useLayoutEffect(() => {
    const ref = collection(db, "users");
    const q = query(ref, where("type", "==", "Needy"));
    onSnapshot(q, (products) =>
      setData(
        products.docs.map((product) => ({
          id: product.id,
          data: product.data(),
        }))
      )
    );
    // console.log(data);
  }, [name]);
  return (
    <View>
      <View>
        <TextInput
          label="Search..."
          placeholder="Search by Name"
          value={name}
          onChangeText={(text) => setName(text)}
          style={{
            backgroundColor: "#eee",
            marginHorizontal: "5%",
          }}
        />
      </View>
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        {data.map((item, key) => (
          <View key={key}>
            {name === null && (
              <TouchableOpacity
                key={key}
                style={{
                  backgroundColor: "#fff",
                  margin: 5,
                  padding: 10,
                  borderRadius: 10,
                }}
                onPress={() =>
                  navigation.navigate("Needy Details", {
                    id: item.id,
                  })
                }
              >
                <Image
                  source={{
                    uri: item.data.picture,
                  }}
                  style={{
                    height: 250,
                    width: "100%",
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    backgroundColor: "#1dad81",
                    paddingVertical: 15,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {item.data.status}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {item.data.name}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {item.data.type}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#1E88E5",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 50,
                    marginHorizontal: 15,

                    borderRadius: 5,
                  }}
                  onPress={() =>
                    navigation.navigate("Add Routine Order", {
                      id: item.id,
                      type: "Needy",
                    })
                  }
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Select Needy
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            )}
            {name !== null &&
              item.data.name
                .toString()
                .toLowerCase()
                .includes(name.toString().toLowerCase()) && (
                <TouchableOpacity
                  key={key}
                  style={{
                    backgroundColor: "#fff",
                    margin: 5,
                    padding: 10,
                    borderRadius: 10,
                  }}
                  onPress={() =>
                    navigation.navigate("User Details", {
                      id: item.id,
                    })
                  }
                >
                  <Image
                    source={{
                      uri: item.data.picture,
                    }}
                    style={{
                      height: 250,
                      width: "100%",
                    }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      backgroundColor: "#1dad81",
                      paddingVertical: 15,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      {item.data.status}
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      {item.data.name}
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      {item.data.type}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#1E88E5",
                      alignItems: "center",
                      justifyContent: "center",
                      height: 50,
                      marginHorizontal: 15,

                      borderRadius: 5,
                    }}
                    onPress={() =>
                      navigation.navigate("Add Routine Order", {
                        id: item.id,
                        type: "Needy",
                      })
                    }
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      Select Needy
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default SearchNeedyScreen;

const styles = StyleSheet.create({});
