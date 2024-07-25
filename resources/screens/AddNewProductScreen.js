import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { auth, db } from '../../firebase/firebase.config'
import { TextInput } from 'react-native-paper'
import { addDoc, collection } from 'firebase/firestore'
import Products from '../components/Products'

const AddNewProductScreen = ({ navigation,route }) => {
    // backend area

    const [name, setName] = useState(null);
    const [price, setPrice] = useState(null);

    // loginfunction

    const AddProduct = async () => {
       
        if (name && price) {
            // alert("Dfgdg");
            // Add a new document with a generated id.
            const docRef = await addDoc(collection(db,"products"), {
                name: name,
                price: price,
                picture:"https://championsports.pk/wp-content/uploads/2023/08/202202121851241080251172.jpg"
            })
            .then(() => {
                alert("Product Added successfully.");
                // navigation.replace("Home");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.errorMessage;
                alert(errorMessage);
            });
        }
        else {
            alert("feilds can't be empty")
        }
    }
    return (
        <View style={{
            marginTop: 100,
        }}>
            <View style={{
                alignItems: 'center'
            }}>
                <Image
                    source={{
                        uri: 'https://png.pngtree.com/png-clipart/20220726/original/pngtree-smiling-woman-volunteer-giving-products-in-bag-to-beggar-man-png-image_8419611.png'
                    }}

                    style={{
                        height: 150,
                        width: 150,
                    }}
                />
                <Text style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    color: 'orange'
                }}>
                    Helping Hand
                </Text>

            </View>
            <View style={{
                marginTop: 60,
            }}>
                <TextInput
                    label="Name"
                    placeholder="Enter Name"
                    style={{
                        marginHorizontal: 20,
                        backgroundColor: 'white',
                        marginVertical: 15,
                    }}
                    onChangeText={(text) => setName(text)}
                />
                <TextInput
                    label="Price"
                    placeholder="Enter Price"
                    style={{
                        marginHorizontal: 20,
                        backgroundColor: 'white',
                        marginVertical: 15,
                    }}
                    onChangeText={(text) => setPrice(text)}
                />
            </View>
            <View>
                <TouchableOpacity style={{
                    backgroundColor: 'green',
                    height: 45,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginHorizontal: 20,
                    borderRadius: 20,
                }}
                    onPress={()=>AddProduct()}
                >
                    <Text style={{
                        color: 'white'
                    }}>
                        Add Post 
                    </Text>
                </TouchableOpacity>
                <Products/>
            </View>
        </View>
    )
}

export default AddNewProductScreen

const styles = StyleSheet.create({})