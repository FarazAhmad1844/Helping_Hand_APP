import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase/firebase.config";
import Products from "../components/Products";
import Menu from "../components/Menu";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import User from "../components/User";

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [name, setName] = useState(null);
  const [type, setType] = useState("Donor");
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
    //  alert(type);
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
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwTFwjKF-FfgpcOEppsg9ezUYxhyW8mxcrQQ&usqp=CAU",
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
  // useEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: () => (
  //       <TouchableOpacity onPress={()=>navigation.navigate("Donor New Post",{
  //         type:'Needy'
  //       })}>
  //       <Image source={{
  //         uri:'https://static-00.iconduck.com/assets.00/plus-icon-2048x2048-z6v59bd6.png'
  //       }}
  //       style={{
  //         height:35,
  //         width:35,
  //         marginLeft:10,
  //       }}
  //        />
  //     </TouchableOpacity>
  //     ),
  //   });

  // }, [navigation]);
  const logout = () => {
    signOut(auth).then(() => {
      navigation.replace("Login");
    });
  };

  const sendRequest = async (postId) => {
    const q = query(collection(db, "requests"), where("postId", "==", postId));

    const querySnapshot = await getDocs(q);
    let check = false;
    querySnapshot.forEach((doc) => {
      if (doc.data().needyId === auth.currentUser.uid) {
        check = true;
      }
    });
    if (check == false) {
      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "requests"), {
        needyId: auth.currentUser.uid,
        postId: postId,
        status: "Pending",
        // donorId:donorId,
      });
    }
    alert("Request Sent Successfully.");
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
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 25,
              color: "black",
            }}
          >
            Needy Dashboard
          </Text>
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

        <Text
          style={{
            textAlign: "center",
            margin: 5,
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          All Posts
        </Text>

        <ScrollView vertical showsVerticalScrollIndicator={false}>
          {data.map((item, key) => (
            <View key={key}>
              {(type === "Donor" || type === "Volunteer") &&
                item.data.postsBy === "Donor" && (
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
                            padding: 10,
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
                        onPress={() => sendRequest(item.id)}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          Send Request
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
            </View>
          ))}
        </ScrollView>
      </KeyboardAwareScrollView>
      <Menu type="Needy" />
      <TouchableOpacity
        style={{
          zIndex: 1500,
          position: "absolute",
          bottom: 100,
          right: 30,
        }}
        onPress={() =>
          navigation.navigate("Donor New Post", {
            type: "Needy",
          })
        }
      >
        <View
          style={{
            // padding:10,
            backgroundColor: "#eee",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 60,
            height: 60,
            width: 60,
          }}
        >
          <Image
            source={{
              uri: "https://static-00.iconduck.com/assets.00/plus-icon-2048x2048-z6v59bd6.png",
            }}
            style={{
              height: 35,
              width: 35,
              // marginLeft:10,
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
