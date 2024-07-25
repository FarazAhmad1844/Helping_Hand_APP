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

const ReportsScreen = ({ navigation }) => {
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
    const washingtonRef = doc(db, "reports", id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, {
      status: status,
    }).then(() => {
      alert(status + " Successfully.");
    });
  };
  return (
    <KeyboardAwareScrollView>
      <Text
        style={{
          textAlign: "center",
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        Reports
      </Text>

      <ScrollView vertical showsVerticalScrollIndicator={false}>
        {data.map((item, key) => (
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

                alignItems: "center",

                borderRadius: 10,
                shadowColor: "black",
                shadowOpacity: 0.1,
                elevation: 10,
                shadowRadius: 15,
                shadowOffset: { width: 56, height: 20 },
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
                  }}
                >
                  Complainer
                </Text>
                <User id={item.data.complainerId} />
              </View>
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Offender
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
                    marginBottom: 10,
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
                    navigation.navigate("SingleProduct", {
                      id: item.data.postId,
                      type: "Admin",
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
            <TouchableOpacity
                style={{
                  backgroundColor: "red",
                  height: 40,
                  marginHorizontal: "5%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderTopLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  borderRadius: 12,
                }}
                onPress={() => updateDetails(item.id, "completed")}
              >
                <Text
                  style={{
                    color: "white",
                  }}
                >
                  Completed
                </Text>
              </TouchableOpacity>

          </View>
        ))}
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default ReportsScreen;

const styles = StyleSheet.create({});
