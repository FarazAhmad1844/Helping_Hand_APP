import {
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Users from "../../components/Users";
import Menu from "../../components/Menu";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../../../firebase/firebase.config";
import User from "../../components/User";
import { signOut } from "firebase/auth";

const DonorDashboard = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [name, setName] = useState(null);
  const [type, setType] = useState("Needy");
  useLayoutEffect(() => {
    // alert(route.params.type);
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
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            signOut(auth).then(() => {
              alert("Your are logged out");
              navigation.replace("Login", {
                type: "Donor",
              });
            });
          }}
        >
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyktsuIq1P1vbhH5PDzq2szlDbN-J9fGg79A&usqp=CAU",
            }}
            style={{
              height: 35,
              width: 35,
              marginRight: 10,
              
            }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  useEffect(() => {
    if (route.params.type === "Volunteer") {
      navigation.setOptions({
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Add New Needy")}
          >
            <Image
              source={{
                uri: "https://simpleicon.com/wp-content/uploads/add-user.png",
              }}
              style={{
                height: 40,
                width: 40,
                marginLeft: 10,
              }}
            />
          </TouchableOpacity>
        ),
      });
    }
  }, [navigation]);

  const changeRequestStatus = async (status, id) => {
    const ref = doc(db, "posts", id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(ref, {
      status: status,
    }).then(() => {
      alert("Post Status Updated Successfully.");
    });
  };

  return (
    <View>
      <KeyboardAwareScrollView
        style={{
          height: "90%",
          
        }}
      >
        <View
          style={{
            marginLeft: 20,
            marginVertical: 10,
            marginTop:50
          }}
        >
          {route.params.type === "Donor" && (
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 25,
                color: "black",
              }}
            >
              Donor Dashboard
            </Text>
          )}
          {route.params.type === "Volunteer" && (
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 25,
                color: "black",
              }}
            >
              Volunteer Dashboard
            </Text>
          )}
          <Text
            style={{
              // fontWeight:'bold',
              fontSize: 12,
              color: "black",
            }}
          >
            Manage Everything here
          </Text>
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
              {type === "Needy" && item.data.postsBy === "Needy" && item.data.status!=='Suspended' && item.data.status!=='Accepted' && (
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
                      fontSize: 22,
                      marginVertical: 10,
                    }}
                  >
                    {item.data.title}
                  </Text>
                  <Image
                    source={{
                      uri: item.data.picture,
                    }}
                    style={{
                      height: 190,
                      width: "100%",
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
                            color: "black",
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
                        onPress={() => navigation.navigate("Donor Chat")}
                      >
                        <Image
                          source={{
                            uri: "https://cdn.icon-icons.com/icons2/806/PNG/512/chat-21_icon-icons.com_65993.png",
                          }}
                          style={{
                            height: 40,
                            width: 40,
                            marginVertical: 5,
                          }}
                        />
                        <Text
                          style={{
                            marginTop: 1,
                          }}
                        >
                          Chat{" "}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "red",
                          padding: 10,
                          borderRadius: 12,

                          marginVertical: 5,
                        }}
                        onPress={() =>
                          navigation.navigate("AddNewReportScreen", {
                            post: item.id,
                            sinner: item.data.userId,
                            type: "Donor",
                          })
                        }
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
                    <TouchableOpacity
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#32393d",
                        padding: 10,
                        borderRadius: 12,
                        marginVertical: 5,

                        borderRadius: 12,
                        shadowColor: "black",
                        shadowOpacity: 0.3,
                        elevation: 6,
                        shadowRadius: 15,
                        shadowOffset: { width: 56, height: 20 },
                      }}
                      onPress={() => changeRequestStatus("Accepted", item.id)}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          fontSize: 15,
                        }}
                      >
                        Accept Now
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </KeyboardAwareScrollView>
      <Menu
        type={route.params.type}
        Style={{
          height: "10%",
        }}
      />
    </View>
  );
};

export default DonorDashboard;

const styles = StyleSheet.create({});
