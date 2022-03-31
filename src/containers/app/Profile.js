import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { headerColor, vh, vw } from '../../constants'
import firebase from 'firebase'
import { ImagePickers } from '../../components'

const Profile = ({ navigation }) => {

    const [userData, setUserData] = useState({})

    const [inputs, setInputs] = useState({
        name: "",
        image: null
    })

    const onChangeHandler = (name, value) => {
        setInputs({
            ...inputs,
            [name]: value
        })
    }
    useEffect(() => {
        getUserProfile()
    }, [])

    const getUserProfile = () => {
        let id = firebase.auth().currentUser.uid
        firebase.database().ref(`users/${id}`)
            .on("value", snapshot => {
                // console.log(snapshot.val(), "snapshot");
                let data = snapshot.val() ? snapshot.val() : {}
                setInputs(data)
            })
    }

    const logoutUser = () => {
        // alert("Logout")
        firebase.auth().signOut()
    }

    const updateProfile = () => {
        // alert("hello")
        let id = firebase.auth().currentUser.uid
        firebase.database().ref(`users/${id}`).update({
            ...inputs
        })
    }
    const picImage = (images) => {
        // console.log(images, "Image");
        UploadImageToCloudinary(images)
    }

    const UploadImageToCloudinary = async (e) => {
        console.log(e, "EEEEEE");
        let apiUrl = 'https://api.cloudinary.com/v1_1/dqsji3tjw/image/upload';

        let data = {
            "file": e,
            "upload_preset": "Images",
        }

        fetch(apiUrl, {
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
        }).then(async r => {
            let data = await r.json()
            console.log(data.secure_url)
            setInputs({ ...inputs, image: data.secure_url })
            // return data.secure_url
        }).catch(err => console.log(err))
    }
    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={Styles.container}>
            <View style={{ marginTop: 20, flex: 0.20 }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginHorizontal: 10 }}>
                    <Text style={{ fontSize: 30 }}>
                        Profile
                    </Text>
                    <TouchableOpacity
                        onPress={logoutUser}
                        style={{ backgroundColor: headerColor, padding: 10, borderRadius: 10 }}>
                        <Text style={{ color: "white" }}>Log Out</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    {/* <Image source={{ uri: inputs.image }} style={{ width: 100, height: 100, borderRadius: 100 }} /> */}
                    <ImagePickers
                        type="profile"
                        val={inputs?.image}
                        picImage={picImage}
                        width={100} height={100} borderRadius={100} title="Upload Profile" />
                </View>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center", flex: 0.50 }}>
                <View style={{ backgroundColor: headerColor, flex: 0.25, width: vw * 0.9, justifyContent: "center", alignItems: "center", borderRadius: 10, marginTop: vh * 0.05 }}>
                    {/* <Text style={{ color: "white", fontSize: 18 }}>{inputs.name}</Text> */}
                    <TextInput
                        placeholder="Name"
                        value={inputs?.name}
                        onChangeText={(text) => onChangeHandler("name", text)}
                        style={{ color: "white", fontSize: 18, borderBottomWidth: 1 }}
                    />
                </View>
                <View style={{ backgroundColor: headerColor, flex: 0.25, width: vw * 0.9, justifyContent: "center", alignItems: "center", borderRadius: 10, marginTop: vh * 0.02 }}>
                    <Text style={{ color: "white", fontSize: 18 }}>{inputs?.email}</Text>
                </View>
                <TouchableOpacity
                    onPress={updateProfile}
                    style={{ backgroundColor: headerColor, flex: 0.25, width: vw * 0.4, justifyContent: "center", alignItems: "center", borderRadius: 10, marginTop: vh * 0.06 }}>
                    <Text style={{ color: "white", fontSize: 18 }}>Update Profile</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Profile