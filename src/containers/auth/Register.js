import React, { useState } from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native"
import { Button, TextInputs, ImagePickers } from "../../components";
import firebase from "firebase";
// import facebookLogo from '../../assets/facebookLogo.png'
import { headerColor, vh, vw } from "../../constants";
import logo from '../../../assets/splash.png'


const Register = ({ navigation }) => {
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [imageUrl, setImageUrl] = useState("")


    // console.log(inputs.name, inputs.email, inputs.password, "States");

    const onChangeHandler = (name, value) => {
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const signupUser = () => {
        // alert("Sign Up")
        // await uploadImage()
        firebase.auth().createUserWithEmailAndPassword(inputs.email, inputs.password)
            .then(response => {
                let id = firebase.auth().currentUser.uid
                firebase.database().ref(`users/${id}`)
                    .set({
                        name: inputs.name,
                        email: inputs.email,
                        image: imageUrl,
                        isActive: true
                    })
                    .then(res => {
                        setInputs({})
                        console.log("Res", res);
                    })
                // alert("Succesful")
                console.log("Responseeee", response);
            })
            .catch(err => {
                alert(err.message)
                console.log("ERRRRROR", err);
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
            setImageUrl(data.secure_url)
            // return data.secure_url
        }).catch(err => console.log(err))
    }

    console.log(imageUrl, "Image Url");

    return (

        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={Style.container} >
            <View style={{ flex: 0.40, alignItems: "center" }}>
                <Image source={logo} style={{ width: 300, height: 100 }} />
                <Text style={{ fontSize: 30, marginRight: vw * 0.07 }}>Welcome</Text>
                {/* <Text style={{ fontSize: 15, marginTop: vh * 0.01 }}>Please Register</Text> */}

                <ImagePickers type="register" picImage={picImage} width={100} height={100} borderRadius={100} title="Upload Profile" />

            </View>
            <View style={{ flex: 0.25 }}>
                <View style={{ marginVertical: 15 }}>
                    <TextInputs
                        placeholder="Name"
                        value={inputs.name}
                        onChangeText={(text) => onChangeHandler("name", text)}
                    />
                </View>
                <TextInputs
                    placeholder="Email"
                    value={inputs.email}
                    onChangeText={(text) => onChangeHandler("email", text)}
                />
                <View style={{ marginVertical: 15 }}>
                    <TextInputs
                        placeholder="password"
                        value={inputs.password}
                        onChangeText={(text) => onChangeHandler("password", text)}
                        secureTextEntry
                    />
                </View>
            </View>
            <View style={{ flex: 0.33 }}>
                <View style={{ marginTop: 20 }}>
                    <Button onPress={signupUser} name="Sign Up" color={headerColor} />
                </View>

                <Text onPress={() => navigation.navigate("login")} style={{ textDecorationLine: "underline", textAlign: "center", marginTop: vh * 0.03 }}>Already have an account ? Login</Text>
            </View>
        </ScrollView >
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    }
})
export default Register
