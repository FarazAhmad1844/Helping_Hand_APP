import React, { useEffect, useLayoutEffect, useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { StyleSheet, SafeAreaView, Text, View } from "react-native";

import { StatusBar } from "react-native";
import { KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { ScrollView } from "react-native";
import { TextInput } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { auth, db } from "../../../firebase/firebase.config";
import {
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { collection, addDoc, doc, orderBy } from "firebase/firestore";
const DonorChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [check, setCheck] = useState(false);
  const [chatId, setChatId] = useState(null);
  useEffect(() => {
    // try to check chat is creted or not
    const readChatDetails = async () => {
      const q = query(
        collection(db, "chats"),
        where("postId", "==", route.params.postId)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (
          doc.data().needyId === route.params.needyId &&
          doc.data().donorId === route.params.donorId
        ) {
          setChatId(doc.id);
        }
      });
      setCheck(true);
    };
    const createNewChat = async () => {
      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "chats"), {
        postId: route.params.postId,
        donorId: route.params.donorId,
        needyId: route.params.needyId,
      });
      console.log("Document written with ID: ", docRef.id);
      setChatId(docRef.id);
    };
    readChatDetails();
    if (check === true) {
      if (chatId === null) {
        createNewChat();
      }
    }
    // alert(chatId);
  }, [chatId, check]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackTitleVisible: false,
      //   headerTitleAlign: "left",

      headerRight: () => (
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAaeVfXxyG1sNBohvr-x5NOCzM9lvcF_pTzA&usqp=CAU",
          }}
          style={{
            width: 30,
            height: 30,
            borderRadius: 30,
            marginRight: 7,
          }}
        />
      ),
      // headerRight:()=>(
      //     <View
      //     style={{
      //         flexDirection:"row",
      //         justifyContent:"space-between",
      //         width:80,
      //         marginRight:20,
      //      }}
      //     >
      //         <TouchableOpacity>
      //             <FontAwesome name="video-camera" size={24} color="white" />
      //         </TouchableOpacity>
      //         <TouchableOpacity>
      //             <Ionicons name="call" size={24} color="white" />
      //         </TouchableOpacity>
      //     </View>
      // ),
    });
  }, [navigation]);
  const sendMessage = async () => {
    if (input) {
      Keyboard.dismiss();
      setInput("");
      const newDocRef = doc(db, "chats", chatId);
      await addDoc(collection(newDocRef, "messages"), {
        timestamp: serverTimestamp(),
        message: input,
        senderId: auth.currentUser.uid,
      })
        .then((chat) => {
          console.log("Document written with ID: ", chat.id);
          // navigation.replace("Home");
          setInput(null);
        })
        .catch((error) => alert(error));
    } else {
      alert("Enter something");
    }
  };
  useLayoutEffect(() => {
    if (chatId !== null) {
      const newDocRef = doc(db, "chats", chatId);
      const collectionRef = collection(newDocRef, "messages");
      const q = query(collectionRef, orderBy("timestamp"));
      const unsubscribe = onSnapshot(q, (snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
      // console.log(messages);
      return unsubscribe;
    }
  }, [chatId]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {/* Platform.OS==="ios" ||  */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback
        //  onPress={Keyboard.dismiss()}
        >
          <>
            <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
              {messages.map((item, key) => (
                <View key={key}>
                  {item.data.senderId === auth.currentUser.uid && (
                    <View style={styles.reciever}>
                      <Image
                        source={{
                          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAaeVfXxyG1sNBohvr-x5NOCzM9lvcF_pTzA&usqp=CAU",
                        }}
                        style={{
                          height: 30,
                          width: 30,
                          borderRadius: 30,
                          marginBottom: 5,
                        }}
                      />
                      <Text style={styles.recieverText}>
                        {item.data.message}{" "}
                      </Text>
                    </View>
                  )}
                  {item.data.senderId !== auth.currentUser.uid && (
                    <View style={styles.sender}>
                      <Image
                        source={{
                          uri: "https://images.squarespace-cdn.com/content/v1/631ba8eed2196a6795698665/3690ca61-6a9d-4c93-a2a5-83a5f2aa1648/2022-08-16-Trinet-0540-Martinez-Juan.jpg",
                        }}
                        style={{
                          height: 30,
                          width: 30,
                          borderRadius: 30,
                          marginBottom: 5,
                        }}
                      />
                      <Text style={styles.senderText}>{item.data.message}</Text>
                    </View>
                  )}
                </View>
              ))}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                value={input}
                onChangeText={(text) => setInput(text)}
                placeholder="Send Message"
                style={styles.textInput}
              />
              <TouchableOpacity
                onPress={() => sendMessage()}
                activeOpacity={0.5}
              >
                <Image
                  source={{
                    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9uoOTWGiBMnHrRGFOd4RrLfzLYEsuFtsizzAw5SKMcQ&s",
                  }}
                  style={{
                   
                    width: 40,
                    height: 40,
                    borderRadius: 100,
                 
                  }}
                />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default DonorChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reciever: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#2B68E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  recieverText: {
    color: "black",
    fontWeight: "500",
    marginLeft: 10,
  },
  senderText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 15,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    // borderColor:"transparent",
    backgroundColor: "#ECECEC",
    // borderWidth:1,
    padding: 10,
    color: "gray",
    borderRadius: 30,
  },
});
