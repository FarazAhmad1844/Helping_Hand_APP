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
import { auth, db } from "../../../firebase/firebase.config";
import { TextInput } from "react-native-paper";
import User from "../../components/User";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const RoutineOrdersScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [name, setName] = useState(null);
  useLayoutEffect(() => {
    const ref = collection(db, "routineorder");
    const q = query(ref, where('volunteerId','==',auth.currentUser.uid));
    onSnapshot(q, (products) =>
      setData(
        products.docs.map((product) => ({
          id: product.id,
          data: product.data(),
        }))
      )
    );
    // console.log(data);
  }, []);


  const updateDetails = async (id, status) => {
    const washingtonRef = doc(db, "routineorder", id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, {
      status: status,
    }).then(() => {
      alert(status + " Successfully.");
    });
  };
  return (
    <KeyboardAwareScrollView>
      {/* <Text
          style={{
            textAlign: "center",
          }}
        >
          My Routine Orders
        </Text> */}

      <ScrollView vertical showsVerticalScrollIndicator={false}>

      <TouchableOpacity
            style={{
              backgroundColor: "#1dad81",
              justifyContent: "center",
              alignItems: "center",
              height: 45,
              width: "80%",
              marginTop:7,
              marginBottom:2,
              marginLeft:35,

              borderRadius: 8,
              shadowColor: "black",
              shadowOpacity: 0.3,
              elevation: 6,
              shadowRadius: 15,
              shadowOffset: { width: 56, height: 20 },
            }}
            onPress={() =>
              navigation.navigate("Search Needy", {
                
              })
            }
          >
            <Text
              style={{
                color: "white",
              }}
            >
              Add New Order
            </Text>
          </TouchableOpacity>
        {data.map((item, key) => (
          <View key={key}>
            {name === null && (
              <View
                key={key}
                style={{
                  backgroundColor: "#191C20",
                  margin: 5,
                  padding: 5,
                  borderRadius: 10,
                }}
              >
              
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    backgroundColor: "white",
                    paddingVertical: 15,
                    alignItems: "center",
                    borderRadius: 10,
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
                      Needy
                    </Text>
                    <User id={item.data.needyId} />
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                    }}
                  >
                <View>
                <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 16,
                        marginBottom: 5,
                        marginTop: 7,
                      }}
                    >
                      {item.data.status}
                    </Text>
                </View>
                 
                    <TouchableOpacity
                      style={{
                        backgroundColor:"red",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 65,
                        width: 70,
                        marginBottom: 43,
                        paddingHorizontal: 5,
                        marginTop: 30,
                        marginLeft:2,
                      

                        borderRadius: 15,
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
                          fontWeight:"bold",
                        }}
                      >
                        Cancel Order
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
                    {item.data.inculde}
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

export default RoutineOrdersScreen;

const styles = StyleSheet.create({});
