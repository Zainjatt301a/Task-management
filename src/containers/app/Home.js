import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { headerColor, vh, vw } from '../../constants'
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import firebase from 'firebase';

const Home = ({ navigation: { navigate } }) => {

    const [tasks, setTasks] = useState({})

    useEffect(() => {
        getTasks()
    }, [])

    const getTasks = () => {
        // let id = firebase.auth().currentUser.email
        // console.log(id, "Id");
        firebase.database().ref("Tasks")
            .on("value", snapshot => {
                // console.log(snapshot.val(), "Snapshot");
                let temp = snapshot.val() ? snapshot.val() : {}
                setTasks(temp)

            })
    }


    const openTaskDetail = (data, firebaseKey) => {
        navigate("TaskDetail", { data, firebaseKey })
    }

    let keys = Object.keys(tasks)
    console.log(keys, "Keys");
    console.log(tasks, "Task");
    return (
        // <>
        //     <Text style={{ fontSize: 30, marginTop: vh * 0.03, marginLeft: vw * 0.03 }}>
        //         All Tasks
        //     </Text>
        //     <ScrollView contentContainerStyle={Styles.container}>

        //         {
        //             keys.map((items, index) => {
        //                 let email = firebase.auth().currentUser.email
        //                 if (tasks[items]?.isAssigned?.email === email) {
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
        //                                 <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        //                                     Assigned Date:{new Date().toLocaleDateString()}
        //                                 </Text>
        //                                 <Text style={{ fontSize: 18, fontWeight: "bold" }}>Status:{tasks[items].status}</Text>
        //                             </View>
        // <View style={{ flexDirection: 'row', borderTopWidth: 1, justifyContent: "center" }}>
        //     <TouchableOpacity
        //         onPress={() => openTaskDetail(tasks[items], items)}
        //         style={{ flex: 0.30, justifyContent: "center", alignItems: "center", paddingVertical: 5, borderLeftWidth: 1, borderRightWidth: 1 }}>
        //         <Text>View Details</Text>
        //     </TouchableOpacity>

        // </View>

        //                         </View>
        //                     )
        //                 }
        //             })
        //         }
        //     </ScrollView >
        // </>
        <>
            <Text style={{ fontSize: 30, marginTop: vh * 0.03, paddingHorizontal: 8, }}>
                All Tasks
            </Text>
            <ScrollView contentContainerStyle={Styles.container}>

                {
                    keys.map((items, index) => {
                        let email = firebase.auth().currentUser.email
                        if (tasks[items]?.isAssigned?.email === email) {
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
                                            Assigned Date: <Text style={{ fontWeight: "normal", fontSize: 15 }}>{tasks[items].date}</Text>
                                        </Text>
                                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Assigned To: <Text style={{ fontWeight: "normal", fontSize: 17 }}>{tasks[items]?.isAssigned?.name}</Text></Text>
                                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Status: <Text style={{ fontWeight: "normal", fontSize: 17 }}>{tasks[items].status}</Text></Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', borderTopWidth: 1, justifyContent: "center" }}>
                                        <TouchableOpacity
                                            onPress={() => openTaskDetail(tasks[items], items)}
                                            style={{ flex: 0.30, justifyContent: "center", alignItems: "center", paddingVertical: 5, borderLeftWidth: 1, borderRightWidth: 1, backgroundColor: headerColor }}>
                                            <Text style={{ color: "white" }}>View Details</Text>
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
export default Home