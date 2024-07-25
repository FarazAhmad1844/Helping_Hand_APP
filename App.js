import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./resources/screens/HomeScreen";
import LoginScreen from "./resources/screens/LoginScreen";
import SignupScreen from "./resources/screens/SignupScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ForgetPasswordScreen from "./resources/screens/ForgetPasswordScreen";
import AddNewProductScreen from "./resources/screens/AddNewProductScreen";
import SingleProductScreen from "./resources/screens/SingleProductScreen";
import UpdateScreen from "./resources/screens/UpdateScreen";
import Dashboard from "./resources/screens/Dashboard/Dashboard";
import ProfileScreen from "./resources/screens/ProfileScreen";
import SingleUserScreen from "./resources/screens/Dashboard/SingleUserScreen";
import UsersScreen from "./resources/screens/Dashboard/UsersScreen";
import PostsScreen from "./resources/screens/Dashboard/PostsScreen";
import { TouchableOpacity, Image } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "./firebase/firebase.config";
import DonorDashboard from "./resources/screens/Donor/DonorDashboard";
import ReportsScreen from "./resources/screens/Dashboard/ReportsScreen";
import DonorPosts from "./resources/screens/Donor/DonorPosts";
import AddNewDonorPostScreen from "./resources/screens/Donor/AddNewDonorPostScreen";

import DonorChatsScreen from "./resources/screens/Donor/DonorChatsScreen";
import DonorChatScreen from "./resources/screens/Donor/DonorChatScreen";
import DonorDonationsScreen from "./resources/screens/Donor/DonorDonationsScreen";
import DonorReportsScreen from "./resources/screens/Donor/DonorReportsScreen";
import AddNewNeedyScreen from "./resources/screens/Donor/AddNewNeedyScreen";
import RoutineOrdersScreen from "./resources/screens/Donor/RoutineOrdersScreen";
import NeedyPosts from "./resources/screens/NeedyPosts";
import RequestScreen from "./resources/screens/RequestScreen";
import DonorRequestScreen from "./resources/screens/Donor/DonorRequestsScreen";
import SplashScreen from "./resources/screens/SplashScreen";
import AddNewReportScreen from "./resources/screens/Donor/AddNewReportScreen";
import NeedyChatsScreen from "./resources/screens/NeedyChatsScreen";
import AddRoutineOrderScreen from "./resources/screens/AddRoutineOrderScreen";
import SearchNeedyScreen from "./resources/screens/SearchNeedyScreen";
import NeedyRoutineOrderScreen from "./resources/screens/NeedyRoutineOrderScreen";
import DonorSinglePostScreen from "./resources/screens/DonorSinglePostScreen";


export default function App() {
  // Backend area
  const Stack = createStackNavigator();
  // const navigation=useNavigation();
  // const logout=()=>{
  //   signOut(auth)
  //   .then(()=>{
  //     navigation.navigate("login");
  //   })
  // }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* //SplashScreen */}


        <Stack.Screen name="App" component={SplashScreen} />

        {/* Login */}

        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Login as Admin" component={LoginScreen} />
        <Stack.Screen name="Login as Donor" component={LoginScreen} />
        <Stack.Screen name="Login as Volunteer" component={LoginScreen} />

        {/* Admin */}

        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            title: "Home",headerShown:false,
            headerStyle: {
              backgroundColor: "#eee",
              
            },
        
          }}
        />
        <Stack.Screen name="User Details" component={SingleUserScreen} />
        <Stack.Screen name="Add Routine Order" component={AddRoutineOrderScreen} />
        <Stack.Screen name="Search Needy" component={SearchNeedyScreen} />
        <Stack.Screen name="Needy Routine Order" component={NeedyRoutineOrderScreen} />
      

        {/* Donor */}

        <Stack.Screen
          name="Donor Home"
          options={{
          headerShown:false,
            headerStyle: {
              backgroundColor: "#eee",
            },
          }}
          component={DonorDashboard}
        />
        <Stack.Screen
          name="Donor Posts"
          options={{
            title: "All Post",
          }}
          component={DonorPosts}
        />
        <Stack.Screen
          name="Donor New Post"
          options={{
            title: "Add New Post",
          }}
          component={AddNewDonorPostScreen}
        />
        
        <Stack.Screen
          name="Donor Single Post"
          options={{
            title: "My Posts",
          }}
          component={DonorSinglePostScreen}
        />
  
        <Stack.Screen
          name="NeedyPosts"
          options={{
            title: "My Posts",
          }}
          component={NeedyPosts}
        />
        <Stack.Screen
          name="Requests"
          options={{
            title: "All Requests",
          }}
          component={RequestScreen}
        />
        <Stack.Screen
          name="AddNewReportScreen"
          options={{
            title: "Add New Report",
          }}
          component={AddNewReportScreen}
        />
        <Stack.Screen
          name="DonorRequests"
          options={{
            title: "All Needy Requests",
          }}
          component={DonorRequestScreen}
        />
        <Stack.Screen
          name="Donor Chats"
          options={{
            title: "Chats",
          }}
          component={DonorChatsScreen}
        />
        <Stack.Screen name="Donor Chat" component={DonorChatScreen} />
        <Stack.Screen
          name="Donor Donation"
          options={{
            title: "History",
          }}
          component={DonorDonationsScreen}
        />
        <Stack.Screen
          name="Donor Reports"
          options={{
            title: "Reports",
          }}
          component={DonorReportsScreen}
        />
        <Stack.Screen name="Add New Needy" component={AddNewNeedyScreen} />
        <Stack.Screen
          name="Routine Orders"
          options={{
            title: "Routine Donations",
          }}
          component={RoutineOrdersScreen}
        />

        {/* Admin Routes */}
        {/* <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: "Login Here",
            headerStyle: {
              backgroundColor: "#eee",
            },
          }}
        /> */}

        {/* <Stack.Screen name="Signup" component={SignupScreen} /> */}

        <Stack.Screen
          name="Users"
          component={UsersScreen}
          options={{
            title: "",
            headerStyle: {
              backgroundColor: "#eee",
            },
          }}
        />

        <Stack.Screen
          name="Reports"
          component={ReportsScreen}
          options={{
            title: "",
            headerStyle: {
              backgroundColor: "#eee",
            },
          }}
        />
        <Stack.Screen name="SingleProduct" component={SingleProductScreen} />
        <Stack.Screen name="Posts" component={PostsScreen} />

        <Stack.Screen name="AddNew" component={AddNewProductScreen} />
        <Stack.Screen name="updateScreen" component={UpdateScreen} />
        <Stack.Screen
          name="Home"
          options={{
            title: "Home",
          }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="NeedyChats"
          options={{
            title: "My Chats",
          }}
          component={NeedyChatsScreen}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />

        <Stack.Screen name="Forget Password" component={ForgetPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});
