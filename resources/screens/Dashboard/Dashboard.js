import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import Users from '../../components/Users'
import Menu from '../../components/Menu'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { signOut } from 'firebase/auth'
import { auth } from '../../../firebase/firebase.config'

const Dashboard = ({navigation}) => {
  useEffect(() => {
   
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={()=>{
          signOut(auth)
          .then(()=>{
            alert("Your are logged out");
            navigation.replace("Login",{
                type:"Admin"
              });
          })
        }}>
        
        <Image source={{
          uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyktsuIq1P1vbhH5PDzq2szlDbN-J9fGg79A&usqp=CAU'
        }}
        style={{
          height:35,
          width:35,
          marginRight:10,
        }}
         />
      </TouchableOpacity>
      ),
    });
  }, [navigation]);
  return (

    <View>
    
      
      <KeyboardAwareScrollView style={{
        height:'90%'
      }}>
      <View
      style={{
     flexDirection:'row',
     marginBottom:20,

     
     marginTop:50
      }}>
       <View 
       style={{
        marginLeft:20
       }}>
      <Text style={{
        fontWeight:'bold',
        fontSize:25,
        color:'black',
      }}>
        Dashboard
      </Text>
      <Text style={{
        // fontWeight:'bold',
        fontSize:12,
        color:'black',
      }}>
        Manage Everything here
      </Text>
    </View>
      <View
      style={{
        marginLeft:160
      }}>
       <TouchableOpacity onPress={()=>{
          signOut(auth)
          .then(()=>{
            alert("Your are logged out");
            navigation.replace("Login",{
                type:"Admin"
              });
          })
        }}>
        
        <Image source={{
          uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyktsuIq1P1vbhH5PDzq2szlDbN-J9fGg79A&usqp=CAU'
        }}
        style={{
          height:35,
          width:35,
          marginRight:10,
        }}
         />
      </TouchableOpacity></View>
     </View>
     <Users type="Donor"/>
     <Users type="Needy" />
     <Users type="Volunteer"/>
      </KeyboardAwareScrollView>
     <Menu type="Admin"  style={{
      height:'10%'
     }}/>
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({})