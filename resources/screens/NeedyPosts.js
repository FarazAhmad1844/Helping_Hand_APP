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
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase/firebase.config";
import { TextInput } from "react-native-paper";
import User from "../components/User";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const NeedyPosts = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [name, setName] = useState(null);
  const [type, setType] = useState("Needy");
  useLayoutEffect(() => {
    const ref = collection(db, "posts");
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
  const deletePost = async (id) => {
    await deleteDoc(doc(db, "posts", id)).then(() => {
      alert("Post has been deleted successfully");
    });
  };
  return (
    <KeyboardAwareScrollView>
      {/* <Text
        style={{
          textAlign: "center",
          margin: 5,
        }}
      >
        My Posts
      </Text> */}

      <View
        style={{
          alignItems: "center",
          marginTop:5,
        }}
      >
        <TouchableOpacity
          style={{
              backgroundColor: "#1dad81",
              justifyContent: "center",
              alignItems: "center",
              height: 45,
              width: "80%",

              borderRadius: 8,
              shadowColor: "black",
              shadowOpacity: 0.3,
              elevation: 6,
              shadowRadius: 15,
              shadowOffset: { width: 56, height: 20 },
            }}
          onPress={() =>
            navigation.navigate("Donor New Post", {
              type: "Needy",
            })
          }
        >
          <Text
            style={{
              color: "white",
            }}
          >
            Add New Post
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView vertical showsVerticalScrollIndicator={false}>
        {data.map((item, key) => (
          <View key={key}>
            {type === "Needy" && item.data.userId === auth.currentUser.uid && (
              <View
                key={key}
                style={{
                  backgroundColor: "#00A86B",
                  margin: 5,
                  padding: 5,
                  borderRadius: 10,
                }}
              >
                <Text
                   style={{
                    color: "black",
                    fontWeight: "bold",
                    marginHorizontal: 10,
                    fontSize: 19,
                    marginVertical: 5,
                  }}
                >
                  {item.data.title}
                </Text>
                <Image
                  source={{
                    uri: item.data.picture,
                  }}
                  style={{
                    height: 250,
                    width: "100%",
                    borderRadius: 10,
                  }}
                />

                <View
                  style={{
                    margin: 10,
                  }}
                >
                  <Text
                  style={{
                      color: "black",
                      fontWeight: "bold",
                      textAlign: "justify",
                    }}
                  >
                    {item.data.description}
                  </Text>
                </View>
                {item.data.status !== "Suspended" && (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <TouchableOpacity
                        style={{
                        backgroundColor: "green",
                        height: 40,
                        // marginHorizontal: "5%",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "40%",

                        borderRadius: 8,
                        shadowColor: "black",
                        shadowOpacity: 0.3,
                        elevation: 6,
                        shadowRadius: 15,
                        shadowOffset: { width: 56, height: 20 },
                      }}
                      onPress={() => updateDetails(item.id, "Completed")}
                    >
                      <Text
                        style={{
                          color: "white",
                        }}
                      >
                        Complete
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                        backgroundColor: "red",
                        height: 40,
                        // marginHorizontal: "5%",
                        width: "40%",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 8,
                        shadowColor: "black",
                        shadowOpacity: 0.3,
                        elevation: 6,
                        shadowRadius: 15,
                        shadowOffset: { width: 56, height: 20 },
                      }}
                      onPress={() => deletePost(item.id)}
                    >
                      <Text
                        style={{
                          color: "white",
                        }}
                      >
                        Delete
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                <TouchableOpacity
                  style={{
                    backgroundColor: "#32393d",
                    height: 40,
                    // marginHorizontal: "5%",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "96%",
                    // borderTopLeftRadius: 10,
                    // borderBottomRightRadius: 10,
                    borderRadius: 12,
                    marginHorizontal: "2%",
                    marginVertical: 8,
                  }}
                  onPress={() =>
                    navigation.navigate("Requests", {
                      id: item.id,
                    })
                  }
                >
                  <Text
                    style={{
                      color: "white",
                    }}
                  >
                    View All Requests
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default NeedyPosts;

const styles = StyleSheet.create({});
