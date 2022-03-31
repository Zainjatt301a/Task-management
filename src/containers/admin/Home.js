import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import { headerColor, vh, vw } from '../../constants'
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import firebase from 'firebase';

const Home = ({ navigation }) => {

    const [taskData, setTaskData] = useState({})

    useEffect(() => {
        getTasks()
    }, [])

    const getTasks = () => {
        firebase.database().ref('Tasks')
            .on("value", snapshot => {
                console.log(snapshot.val(), "Snapshot");
                let temp = snapshot.val() ? snapshot.val() : {}
                setTaskData(temp)
            })
    }


    const openTaskDetail = (data, firebaseKey) => {
        navigation.navigate("adminTaskDetail", { data, firebaseKey })
    }

    let keys = Object.keys(taskData)
    // console.log(keys, "Keys");

    // console.log(taskData, "Task Data");

    const shareTask = (data, firebaseKey) => {
        // alert("share")
        const { email } = data.isAssigned
        const { title, description } = data
        // console.log(email, "data");
        Linking.openURL(`mailto:${email}?subject=Task Assigned&body=Title: ${title}
        Description: ${description}`)

    }

    return (
        <>
            <Text style={{ fontSize: 30, marginTop: vh * 0.03, paddingHorizontal: 8, }}>
                All Tasks
            </Text>
            <ScrollView contentContainerStyle={Styles.container}>

                {
                    keys.map((items, index) => {
                        return (
                            <View
                                key={index}
                                style={{ borderWidth: 1, marginVertical: 10, borderRadius: 5, elevation: 5 }} >
                                <View
                                    style={{ paddingHorizontal: 8, paddingVertical: 5 }}
                                >
                                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                                        Title:<Text style={{ fontWeight: "normal", fontSize: 17 }}> {taskData[items].title}</Text>
                                    </Text>
                                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                                        Assigned Date: <Text style={{ fontWeight: "normal", fontSize: 15 }}>{taskData[items].date}</Text>
                                    </Text>
                                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Assigned To: <Text style={{ fontWeight: "normal", fontSize: 17 }}>{taskData[items]?.isAssigned?.name}</Text></Text>
                                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Status: <Text style={{ fontWeight: "normal", fontSize: 17 }}>{taskData[items].status}</Text></Text>
                                </View>
                                <View style={{ flexDirection: 'row', borderTopWidth: 1 }}>
                                    <TouchableOpacity
                                        onPress={() => openTaskDetail(taskData[items], items)}
                                        style={{ flex: 0.45, justifyContent: "center", alignItems: "center", borderRightWidth: 1, paddingVertical: 5, backgroundColor: headerColor }}>
                                        <Text style={{ color: "white" }}>View Details</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => shareTask(taskData[items], items)}
                                        style={{ flex: 0.55, justifyContent: "center", paddingVertical: 5, alignItems: "center", flexDirection: 'row', backgroundColor: headerColor }}>
                                        <Text style={{ color: "white" }}>Share </Text>
                                        <AntDesign name="sharealt" size={18} color="white" />
                                    </TouchableOpacity>

                                </View>

                            </View>
                        )
                    })
                }
            </ScrollView >
        </>
    )
}

const Styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        // alignItems: "center"
        marginHorizontal: 10
    }
})
export default Home