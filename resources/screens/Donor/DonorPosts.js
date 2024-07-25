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
import { auth, db } from "../../../firebase/firebase.config";
import { TextInput } from "react-native-paper";
import User from "../../components/User";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const DonorPosts = ({ navigation,route }) => {
  const [data, setData] = useState([]);
  const [name, setName] = useState(null);
  const [type, setType] = useState("Donor");
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
            fontWeight: "bold",
            fontSize: 18,
        }}
      >
        All Posts
      </Text> */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 8,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor:"Traditional Forest Green",
            backgroundColor: "#013222",

            height: 45,
            width: "48%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius:8
          }}
          onPress={() => setType("Donor")}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            My Posts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "rgb(250, 249, 246)",
            height: 45,
            width: "48%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius:8
          }}
          onPress={() => setType("Needy")}
        >
          <Text
            style={{
              color: "black",
            }}
          >
            Needy Posts
          </Text>
        </TouchableOpacity>
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
              width: "80%",
              marginTop:7,
              marginBottom:5,

              borderRadius: 8,
              shadowColor: "black",
              shadowOpacity: 0.3,
              elevation: 6,
              shadowRadius: 15,
              shadowOffset: { width: 56, height: 20 },
            }}
            onPress={() =>
              navigation.navigate("Donor New Post", {
                type: route.params.type,
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
            {type === "Donor" && item.data.userId === auth.currentUser.uid && (
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
                {item.data.status !== "Suspended" && item.data.status==='Active' && (
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
                    navigation.navigate("DonorRequests", {
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
            {type === "Needy" && item.data.postsBy === "Needy" && (
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
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    backgroundColor: "white",
                    paddingVertical: 15,
                  }}
                >
                  <User id={item.data.userId} />
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {item.data.status === "Active" && (
                      <Text
                        style={{
                          color: "black",
                          fontWeight: "bold",
                        }}
                      >
                        {item.data.status}
                      </Text>
                    )}
                    {item.data.status !== "Active" && (
                      <Text
                        style={{
                          color: "red",
                          fontWeight: "bold",
                        }}
                      >
                        {item.data.status}
                      </Text>
                    )}
                    <TouchableOpacity
                      style={{
                        alignItems: "center",
                      }}
                      onPress={() => navigation.navigate("Donor Chat",{
                        postId:item.id,
                        donorId:auth.currentUser.uid,
                        needyId:item.data.userId,
                      })}
                    >
                      <Image
                        source={{
                          uri: "https://cdn.icon-icons.com/icons2/806/PNG/512/chat-21_icon-icons.com_65993.png",
                        }}
                        style={{
                          height: 45,
                          width: 45,
                          marginVertical: 5,
                        }}
                      />
                      <Text>Chat</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "red",
                        padding: 8,
                        borderRadius: 12,

                        marginVertical: 5,
                      }}
                      onPress={() => alert("Post Reported Successfully.")}
                    >
                      <Text
                        style={{
                          color: "white",
                        }}
                      >
                        Report
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
                      color: "black",
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

export default DonorPosts;

const styles = StyleSheet.create({});
