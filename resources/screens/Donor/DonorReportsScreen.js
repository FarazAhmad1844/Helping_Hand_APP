import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useLayoutEffect } from "react";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import { TextInput } from "react-native-paper";
import User from "../../components/User";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const DonorReportsScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [name, setName] = useState(null);
  useLayoutEffect(() => {
    const ref = collection(db, "reports");
    const q = query(ref, orderBy("timestamp", "desc"));
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

  const updateDetails = async (id, status) => {
    const washingtonRef = doc(db, "posts", id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, {
      status: status,
    }).then(() => {
      alert(status + " Successfully.");
    });
  };
  return (
    <KeyboardAwareScrollView>
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        {data.map((item, key) => (
          <View key={key}>
            {name === null && (
              <View
                key={key}
                style={{
                  backgroundColor: "#191C20",

                  margin: 5,
                  padding: 5,
                  paddingBottom: 15,
                  borderRadius: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    backgroundColor: "white",
                    paddingVertical: 15,
                    paddingTop: 7,
                    borderRadius: 10,

                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 16,
                        marginBottom: 5,
                        marginTop: 7,
                      }}
                    >
                      Sinner
                    </Text>
                    <User id={item.data.sinnerId} />
                  </View>

                  <View
                    style={{
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        marginVertical: 15,

                        fontSize: 16,
                      }}
                    >
                      {item.data.status}
                    </Text>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#1dad81",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 65,
                        width: 70,
                        marginBottom: 43,

                        paddingHorizontal: 5,

                        borderRadius: 15,
                        shadowColor: "black",
                        shadowOpacity: 0.3,
                        elevation: 6,
                        shadowRadius: 15,
                        shadowOffset: { width: 56, height: 20 },
                      }}
                      onPress={() =>
                        navigation.navigate("Donor Single Post", {
                          id: item.data.postId,
                          type: "Donor",
                        })
                      }
                    >
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        View Post
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    margin: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      textAlign: "justify",
                    }}
                  >
                    {item.data.description}
                  </Text>
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default DonorReportsScreen;

const styles = StyleSheet.create({});
