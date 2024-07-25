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
import { auth,db } from "../../firebase/firebase.config";
import User from "../components/User";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


const NeedyRoutineOrderScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [name, setName] = useState(null);
  useLayoutEffect(() => {
    const ref = collection(db, "routineorder");
    const q = query(ref, where("needyId", "==", auth.currentUser.uid));
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
                    <User id={item.data.volunteerId} />
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

export default NeedyRoutineOrderScreen;

const styles = StyleSheet.create({});
