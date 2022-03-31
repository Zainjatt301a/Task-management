import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { headerColor, vh, vw } from '../../constants'
import firebase from 'firebase'
import avatar from '../../assets/AdminProfileAvatar.png'

const AdminProfile = ({ navigation }) => {

    const [userData, setUserData] = useState({})

    useEffect(() => {
        getUserProfile()
    }, [])

    const getUserProfile = () => {
        let id = firebase.auth().currentUser.uid
        firebase.database().ref(`users/${id}`)
            .on("value", snapshot => {
                // console.log(snapshot.val(), "snapshot");
                let data = snapshot.val() ? snapshot.val() : {}
                setUserData(data)
            })
    }

    const logoutUser = () => {
        // alert("Logout")
        firebase.auth().signOut()
    }

    console.log(userData, "data");
    return (
        <View style={Styles.container}>
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
                    <Image source={avatar} style={{ width: 110, height: 110, borderRadius: 100 }} />
                </View>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center", flex: 0.40 }}>
                <View style={{ backgroundColor: headerColor, flex: 0.30, width: vw * 0.9, justifyContent: "center", alignItems: "center", borderRadius: 10, marginTop: vh * 0.05 }}>
                    <Text style={{ color: "white", fontSize: 18 }}>{userData.name}</Text>
                </View>
                <View style={{ backgroundColor: headerColor, flex: 0.30, width: vw * 0.9, justifyContent: "center", alignItems: "center", borderRadius: 10, marginTop: vh * 0.02 }}>
                    <Text style={{ color: "white", fontSize: 18 }}>{userData.email}</Text>
                </View>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default AdminProfile