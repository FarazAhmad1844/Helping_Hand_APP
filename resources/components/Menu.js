import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Menu = (props) => {
  const navigation = useNavigation();

  return (
    <View>
      {props.type === "Admin" && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            backgroundColor: "white",
            padding: 10,
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("Profile")}
          >
            <Image
              style={{
                height: 35,
                width: 35,
              }}
              source={{
                uri: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-person-icon.png",
              }}
            />
          
            <Text>Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("Dashboard")}
          >
            <Image
              style={{
                height: 35,
                width: 35,
              }}
              source={{
                uri: "https://t3.ftcdn.net/jpg/06/37/06/82/360_F_637068250_GiSz2fq4mVi5d19fiiuJgdPflgHeZsgM.jpg",
              }}
            />
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("Posts")}
          >
            <Image
              style={{
                height: 35,
                width: 35,
              }}
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSccJO3_trnb5VF2lMqTzXaJTCfPSjZ4efa_Q&usqp=CAU",
              }}
            />
            <Text>Posts</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              alignItems: "center",
            }}
            onPress={() =>
              navigation.navigate("Reports", {
                type: "Admin",
              })
            }
          >
            <Image
              style={{
                height: 35,
                width: 35,
              }}
              source={{
                uri: "https://static.thenounproject.com/png/514081-200.png",
              }}
            />
            <Text>Reports</Text>
          </TouchableOpacity>
        </View>
      )} 
      {props.type === "Needy" && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            backgroundColor: "white",
            padding: 10,
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("Profile")}
          >
            <Image
              style={{
                height: 35,
                width: 35,
              }}
              source={{
                uri: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-person-icon.png",
              }}
            />
            <Text>Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("Home")}
          >
            <Image
              style={{
                height: 35,
                width: 35,
              }}
              source={{
                uri: "https://t3.ftcdn.net/jpg/06/37/06/82/360_F_637068250_GiSz2fq4mVi5d19fiiuJgdPflgHeZsgM.jpg",
              }}
            />
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("NeedyPosts")}
          >
            <Image
              style={{
                height: 35,
                width: 35,
              }}
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSccJO3_trnb5VF2lMqTzXaJTCfPSjZ4efa_Q&usqp=CAU",
              }}
            />
            <Text>Posts</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              alignItems: "center",
            }}
            onPress={() =>
              navigation.navigate("Requests")
            }
          >
            <Image
              style={{
                height: 35,
                width: 35,
              }}
              source={{
                uri: "https://static.thenounproject.com/png/514081-200.png",
              }}
            />
            <Text>Requests</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: "center",
            }}
            onPress={() =>
              navigation.navigate("NeedyChats")
            }
          >
            <Image
              style={{
                height: 35,
                width: 35,
              }}
              source={{
                uri: "https://static.thenounproject.com/png/514081-200.png",
              }}
            />
            <Text>Chats</Text>
          </TouchableOpacity>
          
        </View>
      )} 
      {(props.type === "Donor" ||  props.type === "Volunteer") && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              backgroundColor: "white",
              padding: 10,
            }}
          >
            <TouchableOpacity
              style={{
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("Profile")}
            >
              <Image
                style={{
                  height: 35,
                  width: 35,
                }}
                source={{
                  uri: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-person-icon.png",
                }}
              />
              <Text>Account</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={{
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("Donor Home")}
            >
              <Image
                style={{
                  height: 35,
                  width: 35,
                }}
                source={{
                  uri: "https://t3.ftcdn.net/jpg/06/37/06/82/360_F_637068250_GiSz2fq4mVi5d19fiiuJgdPflgHeZsgM.jpg",
                }}
              />
              <Text>Home</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={{
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("Donor Posts",{
                type:'Donor'
              })}
            >
              <Image
                style={{
                  height: 35,
                  width: 35,
                 
                }}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/1395/1395476.png",
                }}
              />
              <Text>Posts</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("Donor Chats")}
            >
              <Image
                style={{
                  height: 35,
                  width: 35,
                }}
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl_O42p_BGvTnrj70nxKZny_hP_zg_XjmBHQ&usqp=CAU",
                }}
              />
              <Text>Chats</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("Donor Donation")}
            >
              <Image
                style={{
                  height: 35,
                  width: 35,
                }}
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa06Ow0kTjLX1f1_J87uCswkb-sjBlHzIQxg&usqp=CAU",
                }}
              />
              <Text>History</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("Donor Reports")}
            >
              <Image
                style={{
                  height: 35,
                  width: 35,
                }}
                source={{
                  uri: "https://static.thenounproject.com/png/514081-200.png",
                }}
              />
              <Text>Reports</Text>
            </TouchableOpacity>
            {props.type=== "Volunteer" && (
              <TouchableOpacity
              style={{
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("Routine Orders")}
            >
              <Image
                style={{
                  height: 35,
                  width: 35,
                }}
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRMVXA81cHe6n7GYI2sa0xaGU96g_sAqOehg&usqp=CAU",
                }}
              />
              <Text>Routine</Text>
            </TouchableOpacity>
            )}
          </View>
         )}

         
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({});
