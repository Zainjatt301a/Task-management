import React, { useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator, Image, ScrollView } from "react-native"
import { Button, TextInputs } from "../../components";
// import facebookLogo from '../../assets/facebookLogo.png'
import AuthStack from "../../navigation/AuthStack";
import { EvilIcons } from '@expo/vector-icons';
import { headerColor, vh } from "../../constants";
import firebase from "firebase";
import * as Facebook from 'expo-facebook';
import axios from "axios";
import logo from '../../../assets/splash.png'

const Login = ({ navigation }) => {

    const [loader, setLoader] = useState()

    const [inputs, setInputs] = useState({
        userName: "",
        password: ""
    })

    const onChangeHandler = (name, value) => {
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const signinUser = () => {
        // alert("Login")
        // await loginUser(inputs.userName, inputs.password)
        firebase.auth().signInWithEmailAndPassword(inputs.userName, inputs.password)
            .then(response => {
                // setLoading(false)
                // console.log("Login Responseeee", response);
            })
            .catch(error => {
                // setLoading(false)
                // console.log("ERRRRROR", error);
            })

    }

    let permissions = ['public_profile', 'email']
    const loginUserWithFb = async () => {
        // Facebook.logOutAsync()
        try {
            await Facebook.initializeAsync({
                appId: "2055763231254085"
            });

            let result = await Facebook.logInWithReadPermissionsAsync({ permissions })
            const res = await axios.get('https://graph.facebook.com/v2.5/me?fields=picture.width(720).height(720),email,name,friends&access_token=' + result.token)
                .then(res => {
                    // setLoginResult(res.data)
                    console.log("FAcebook success", res.data);
                    // setEmail(res.data.email)

                    // console.log(id, "IDDDDDD");
                    // let tempId = []
                    // let id = firebase.auth().currentUser?.uid
                    // id = res.data.id
                    // tempId.push(id, res.data.id)
                    // console.log(id, "Temp id");

                    // console.log(res.data, "RESSSS")

                })
                .catch(err => {
                    console.log(err, "ERR");
                })
            // console.log(result, "Result");

            // await res.json().name

            // console.log(res, "Res");
            let response = firebase.auth.FacebookAuthProvider.credential(result.token)

            // console.log(response, "Ressssssssss");
            try {

                const result = firebase.auth().signInWithCredential(response)
                console.log(result, "resultFirebase");
                result.then((res) => {
                    console.log(res, "resResult");
                    let id = res.user.uid
                    firebase.database().ref(`users/${id}`)
                        .set({
                            name: res.additionalUserInfo?.profile?.name,
                            email: res.additionalUserInfo?.profile?.email,
                            image: res.additionalUserInfo?.profile?.picture.data.url,
                            isActive: true,
                        }).then((res) => {
                            console.log("user record success");

                            // console.log(res, "RSSPONSEEEEEEE");
                        }).catch((err) => {
                            // console.log(err, "ERRRRRRRRRRR");
                        })
                })
                return result


            } catch (error) {
                console.log(error, "ERRRRRRRRRRRRRRR");
            }

        }
        catch (err) {
            console.log(err, "errrr");
        }
    }

    // console.log(loginResult, "Login Result");
    return (

        <ScrollView contentContainerStyle={Style.container} keyboardShouldPersistTaps="handled">
            <View style={{ alignItems: "center" }}>
                <Image source={logo} style={{ width: 300, height: 100 }} />
                <Text style={{ fontSize: 30 }}>Welcome Back</Text>
                <Text style={{ fontSize: 15, marginTop: vh * 0.01 }}>Please Sign In to Continue</Text>
            </View>
            <View style={{}}>
                <View style={{ marginVertical: 30 }}>
                    <TextInputs
                        placeholder="Email"
                        value={inputs.userName}
                        onChangeText={(text) => onChangeHandler("userName", text)}

                    />
                </View>
                <View>
                    <TextInputs
                        placeholder="password"
                        value={inputs.password}
                        onChangeText={(text) => onChangeHandler("password", text)}
                        secureTextEntry
                    />
                </View>
            </View>
            <View style={{}}>
                <View style={{ marginTop: 20 }}>
                    <Button onPress={signinUser} name="Sign in" color={headerColor} />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Button onPress={loginUserWithFb} pic={<EvilIcons name="sc-facebook" size={26} color="white" />} name="Continue with Facebook" color="#2B6EDA" />
                </View>
                <Text onPress={() => navigation.navigate("register")} style={{ textDecorationLine: "underline", textAlign: "center", marginTop: 20 }}>Don't Have an account ?</Text>
            </View>
        </ScrollView>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    }
})
export default Login
