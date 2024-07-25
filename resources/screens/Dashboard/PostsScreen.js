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

const PostsScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [name, setName] = useState(null);
  const [by, setBy] = useState("All");
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
  return (
    <KeyboardAwareScrollView>
      <View>
        <TextInput
          label="Search..."
          placeholder="Search..."
          value={name}
          onChangeText={(text) => setName(text)}
          style={{
            marginTop: 10,
            marginBottom: 3,
            marginHorizontal: "5%",
            backgroundColor: "#eee",

            shadowColor: "black",
            shadowOpacity: 0.3,
            elevation: 6,
            shadowRadius: 15,
            shadowOffset: { width: 56, height: 20 },
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "gray",
              height: 45,
              padding: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setBy("All")}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "gray",
              height: 45,
              padding: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setBy("Needy")}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              Needy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "gray",
              height: 45,
              padding: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setBy("Donor")}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              Donor
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "gray",
              height: 45,
              padding: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setBy("Volunteer")}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              Volunteer
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        {data.map((item, key) => (
          <View>
            {by === "All" && (
              <View key={key}>
                {name === null && (
                  <View
                    key={key}
                    style={{
                      backgroundColor: "#00A86B",
                      margin: 5,
                      padding: 5,
                      borderRadius: 10,
                    }}
                  >
                    <Image
                      source={{
                        uri: item.data.picture,
                      }}
                      style={{
                        height: 250,
                        width: "100%",
                        // borderRadius: 10,
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
                          flexDirection: "column",
                          padding: 10,
                        }}
                      >
                        <Text
                          style={{
                            color: "black",
                            fontWeight: "bold",
                            fontSize: 16,
                            marginBottom: 7,
                          }}
                        >
                          Title
                        </Text>
                        <Text
                          style={{
                            color: "black",
                            fontSize: 15,
                          }}
                        >
                          {item.data.title}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "column",
                          padding: 10,
                        }}
                      >
                        <Text
                          style={{
                            color: "black",
                            fontWeight: "bold",
                            fontSize: 16,
                            marginBottom: 7,
                          }}
                        >
                          Status
                        </Text>
                        <Text
                          style={{
                            color: "black",

                            fontSize: 15,
                          }}
                        >
                          {item.data.status}
                        </Text>
                      </View>
                    </View>
                    <View>
                      {/* <Text
                    style={{
                      color: "black",

                      fontSize: 15,
                    }}
                  >
                    {item.data.status}
                  </Text> */}
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
                    {item.data.status === "Suspended" && (
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#32393d",
                          height: 40,
                          marginHorizontal: "5%",
                          justifyContent: "center",
                          alignItems: "center",
                          // borderTopLeftRadius: 10,
                          // borderBottomRightRadius: 10,

                          borderRadius: 8,
                          shadowColor: "black",
                          shadowOpacity: 0.3,
                          elevation: 6,
                          shadowRadius: 15,
                          shadowOffset: { width: 56, height: 20 },
                        }}
                        onPress={() => updateDetails(item.id, "Active")}
                      >
                        <Text
                          style={{
                            color: "white",
                          }}
                        >
                          Un-Suspend
                        </Text>
                      </TouchableOpacity>
                    )}
                    {item.data.status !== "Suspended" && (
                      <TouchableOpacity
                        style={{
                          backgroundColor: "red",
                          height: 40,
                          marginHorizontal: "5%",
                          justifyContent: "center",
                          alignItems: "center",
                          // borderTopLeftRadius: 10,
                          // borderBottomRightRadius: 10,

                          borderRadius: 8,
                          shadowColor: "black",
                          shadowOpacity: 0.3,
                          elevation: 6,
                          shadowRadius: 15,
                          shadowOffset: { width: 56, height: 20 },
                        }}
                        onPress={() => updateDetails(item.id, "Suspended")}
                      >
                        <Text
                          style={{
                            color: "white",
                          }}
                        >
                          Suspend
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
                {name !== null &&
                  item.data.status !== "Suspended" &&
                  item.data.title
                    .toString()
                    .toLowerCase()
                    .includes(name.toString().toLowerCase()) && (
                    <View
                      key={key}
                      style={{
                        backgroundColor: "lightgreen",
                        margin: 5,
                        padding: 5,
                        borderRadius: 10,
                      }}
                    >
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
                          backgroundColor: "#1dad81",
                          paddingVertical: 15,
                        }}
                      >
                        <User id={item.data.userId} />
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
                          {item.data.title}
                        </Text>
                      </View>
                      <View
                        style={{
                          margin: 10,
                        }}
                      >
                        <Text
                          style={{
                            color: "#1dad81",
                            fontWeight: "bold",
                            textAlign: "justify",
                          }}
                        >
                          {item.data.description}
                        </Text>
                      </View>
                      {item.data.status === "Suspended" && (
                        <TouchableOpacity
                          style={{
                            backgroundColor: "green",
                            height: 40,
                            marginHorizontal: "5%",
                            justifyContent: "center",
                            alignItems: "center",
                            borderTopLeftRadius: 10,
                            borderBottomRightRadius: 10,
                          }}
                          onPress={() => updateDetails(item.id, "Active")}
                        >
                          <Text
                            style={{
                              color: "white",
                            }}
                          >
                            Un-Suspend
                          </Text>
                        </TouchableOpacity>
                      )}
                      {item.data.status !== "Suspended" && (
                        <TouchableOpacity
                          style={{
                            backgroundColor: "red",
                            height: 40,
                            marginHorizontal: "5%",
                            justifyContent: "center",
                            alignItems: "center",
                            borderTopLeftRadius: 10,
                            borderBottomRightRadius: 10,
                          }}
                          onPress={() => updateDetails(item.id, "Suspended")}
                        >
                          <Text
                            style={{
                              color: "white",
                            }}
                          >
                            Suspend
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  )}
              </View>
            )}
            {by !== "All" && by===item.data.postsBy && (
              <View key={key}>
                {name === null && (
                  <View
                    key={key}
                    style={{
                      backgroundColor: "#00A86B",
                      margin: 5,
                      padding: 5,
                      borderRadius: 10,
                    }}
                  >
                    <Image
                      source={{
                        uri: item.data.picture,
                      }}
                      style={{
                        height: 250,
                        width: "100%",
                        // borderRadius: 10,
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
                          flexDirection: "column",
                          padding: 10,
                        }}
                      >
                        <Text
                          style={{
                            color: "black",
                            fontWeight: "bold",
                            fontSize: 16,
                            marginBottom: 7,
                          }}
                        >
                          Title
                        </Text>
                        <Text
                          style={{
                            color: "black",
                            fontSize: 15,
                          }}
                        >
                          {item.data.title}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "column",
                          padding: 10,
                        }}
                      >
                        <Text
                          style={{
                            color: "black",
                            fontWeight: "bold",
                            fontSize: 16,
                            marginBottom: 7,
                          }}
                        >
                          Status
                        </Text>
                        <Text
                          style={{
                            color: "black",

                            fontSize: 15,
                          }}
                        >
                          {item.data.status}
                        </Text>
                      </View>
                    </View>
                    <View>
                      {/* <Text
                    style={{
                      color: "black",

                      fontSize: 15,
                    }}
                  >
                    {item.data.status}
                  </Text> */}
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
                    {item.data.status === "Suspended" && (
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#32393d",
                          height: 40,
                          marginHorizontal: "5%",
                          justifyContent: "center",
                          alignItems: "center",
                          // borderTopLeftRadius: 10,
                          // borderBottomRightRadius: 10,

                          borderRadius: 8,
                          shadowColor: "black",
                          shadowOpacity: 0.3,
                          elevation: 6,
                          shadowRadius: 15,
                          shadowOffset: { width: 56, height: 20 },
                        }}
                        onPress={() => updateDetails(item.id, "Active")}
                      >
                        <Text
                          style={{
                            color: "white",
                          }}
                        >
                          Un-Suspend
                        </Text>
                      </TouchableOpacity>
                    )}
                    {item.data.status !== "Suspended" && (
                      <TouchableOpacity
                        style={{
                          backgroundColor: "red",
                          height: 40,
                          marginHorizontal: "5%",
                          justifyContent: "center",
                          alignItems: "center",
                          // borderTopLeftRadius: 10,
                          // borderBottomRightRadius: 10,

                          borderRadius: 8,
                          shadowColor: "black",
                          shadowOpacity: 0.3,
                          elevation: 6,
                          shadowRadius: 15,
                          shadowOffset: { width: 56, height: 20 },
                        }}
                        onPress={() => updateDetails(item.id, "Suspended")}
                      >
                        <Text
                          style={{
                            color: "white",
                          }}
                        >
                          Suspend
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
                {name !== null &&
                  item.data.status !== "Suspended" &&
                  item.data.title
                    .toString()
                    .toLowerCase()
                    .includes(name.toString().toLowerCase()) && (
                    <View
                      key={key}
                      style={{
                        backgroundColor: "lightgreen",
                        margin: 5,
                        padding: 5,
                        borderRadius: 10,
                      }}
                    >
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
                          backgroundColor: "#1dad81",
                          paddingVertical: 15,
                        }}
                      >
                        <User id={item.data.userId} />
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
                          {item.data.title}
                        </Text>
                      </View>
                      <View
                        style={{
                          margin: 10,
                        }}
                      >
                        <Text
                          style={{
                            color: "#1dad81",
                            fontWeight: "bold",
                            textAlign: "justify",
                          }}
                        >
                          {item.data.description}
                        </Text>
                      </View>
                      {item.data.status === "Suspended" && (
                        <TouchableOpacity
                          style={{
                            backgroundColor: "green",
                            height: 40,
                            marginHorizontal: "5%",
                            justifyContent: "center",
                            alignItems: "center",
                            borderTopLeftRadius: 10,
                            borderBottomRightRadius: 10,
                          }}
                          onPress={() => updateDetails(item.id, "Active")}
                        >
                          <Text
                            style={{
                              color: "white",
                            }}
                          >
                            Un-Suspend
                          </Text>
                        </TouchableOpacity>
                      )}
                      {item.data.status !== "Suspended" && (
                        <TouchableOpacity
                          style={{
                            backgroundColor: "red",
                            height: 40,
                            marginHorizontal: "5%",
                            justifyContent: "center",
                            alignItems: "center",
                            borderTopLeftRadius: 10,
                            borderBottomRightRadius: 10,
                          }}
                          onPress={() => updateDetails(item.id, "Suspended")}
                        >
                          <Text
                            style={{
                              color: "white",
                            }}
                          >
                            Suspend
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  )}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({});
