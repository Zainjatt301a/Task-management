import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native'
import { vh, vw, headerColor } from '../../constants'
import firebase from 'firebase'
import { AntDesign } from '@expo/vector-icons';

const Completed = ({ navigation }) => {

    const [tasks, setTasks] = useState({})

    useEffect(() => {
        getCompletedTasks()
    }, [])

    const getCompletedTasks = () => {
        firebase.database().ref("Tasks")
            .on("value", snapshot => {
                // console.log(snapshot.val(), "snapshot");
                let temp = snapshot.val() ? snapshot.val() : {}
                setTasks(temp)
            })
    }
    const openTaskDetail = (data, firebaseKey) => {
        navigation.navigate("adminTaskDetail", { data, firebaseKey })
    }

    const shareTask = (data, firebaseKey) => {
        // alert("share")
        const { email } = data.isAssigned
        const { title, description } = data
        // console.log(email, "data");
        Linking.openURL(`mailto:${email}?subject=Task Assigned&body=Title: ${title}
        Description: ${description}`)
        // Linking.openURL('mailto:support@example.com?subject=SendMail&body=Description')
    }
    console.log(tasks, "Tasks");
    let keys = Object.keys(tasks)
    console.log(keys, "Keys");

    return (

        // <>
        //     <Text style={{ fontSize: 30, marginTop: vh * 0.03, paddingHorizontal: 8, }}>
        //         All Tasks
        //     </Text>
        //     <ScrollView contentContainerStyle={Styles.container}>

        //         {
        //             keys.map((items, index) => {
        //                 if (tasks[items].status === "succes") {
        //                     return (
        //                         <View
        //                             key={index}
        //                             style={{ borderWidth: 1, marginVertical: 10, borderRadius: 5, elevation: 5 }} >
        //                             <View
        //                                 style={{ paddingHorizontal: 8, paddingVertical: 5 }}
        //                             >
        //                                 <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        //                                     Title: {tasks[items].title}
        //                                 </Text>
        //                                 <Text style={{ fontSize: 16, fontWeight: "bold" }}>
        //                                     Assigned Date:{new Date().toLocaleDateString()}
        //                                 </Text>
        //                                 <Text style={{ fontSize: 18, fontWeight: "bold" }}>Assigned To: {tasks[items].isAssigned.name}</Text>
        //                                 <Text style={{ fontSize: 18, fontWeight: "bold" }}>Status:{tasks[items].status}</Text>
        //                             </View>
        //                             <View style={{ flexDirection: 'row', borderTopWidth: 1 }}>
        //                                 <TouchableOpacity
        //                                     onPress={() => openTaskDetail(tasks[items], items)}
        //                                     style={{ flex: 0.45, justifyContent: "center", alignItems: "center", borderRightWidth: 1, paddingVertical: 5 }}>
        //                                     <Text>View Details</Text>
        //                                 </TouchableOpacity>
        //                                 <TouchableOpacity
        //                                     onPress={() => shareTask(tasks[items], items)}
        //                                     style={{ flex: 0.45, justifyContent: "center", paddingVertical: 5, alignItems: "center", flexDirection: 'row' }}>
        //                                     <Text>Share </Text>
        //                                     <AntDesign name="sharealt" size={18} color="black" />
        //                                 </TouchableOpacity>

        //                             </View>

        //                         </View>
        //                     )
        //                 }

        //             })
        //         }
        //     </ScrollView >
        // </>
        <>
            <Text style={{ fontSize: 30, marginTop: vh * 0.03, paddingHorizontal: 8, }}>
                Completed Tasks
            </Text>
            <ScrollView contentContainerStyle={Styles.container}>

                {
                    keys.map((items, index) => {
                        if (tasks[items].status === "succes") {
                            return (
                                <View
                                    key={index}
                                    style={{ borderWidth: 1, marginVertical: 10, borderRadius: 5, elevation: 5 }} >
                                    <View
                                        style={{ paddingHorizontal: 8, paddingVertical: 5 }}
                                    >
                                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                                            Title:<Text style={{ fontWeight: "normal", fontSize: 17 }}> {tasks[items].title}</Text>
                                        </Text>
                                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                                            Assigned Date: <Text style={{ fontWeight: "normal", fontSize: 15 }}>{new Date().toLocaleDateString()}</Text>
                                        </Text>
                                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Assigned To: <Text style={{ fontWeight: "normal", fontSize: 17 }}>{tasks[items]?.isAssigned?.name}</Text></Text>
                                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Status: <Text style={{ fontWeight: "normal", fontSize: 17 }}>{tasks[items].status}</Text></Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', borderTopWidth: 1 }}>
                                        <TouchableOpacity
                                            onPress={() => openTaskDetail(tasks[items], items)}
                                            style={{ flex: 0.45, justifyContent: "center", alignItems: "center", borderRightWidth: 1, paddingVertical: 5, backgroundColor: headerColor }}>
                                            <Text style={{ color: "white" }}>View Details</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => shareTask(tasks[items], items)}
                                            style={{ flex: 0.55, justifyContent: "center", paddingVertical: 5, alignItems: "center", flexDirection: 'row', backgroundColor: headerColor }}>
                                            <Text style={{ color: "white" }}>Share </Text>
                                            <AntDesign name="sharealt" size={18} color="white" />
                                        </TouchableOpacity>

                                    </View>

                                </View>
                            )
                        }
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

export default Completed