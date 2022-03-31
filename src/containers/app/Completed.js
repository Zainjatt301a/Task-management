import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { vh, vw, headerColor } from '../../constants'
import firebase from 'firebase'
import { AntDesign } from '@expo/vector-icons';


const Completed = ({ navigation }) => {

    const [task, setTask] = useState({})

    useEffect(() => {
        getCompletedTask()
    }, [])

    const getCompletedTask = () => {
        firebase.database().ref(`Tasks`)
            .on("value", snapshot => {
                // console.log(snapshot.val(), "Snapshot");
                let temp = snapshot.val() ? snapshot.val() : {}
                setTask(temp)
            })
    }

    const openTaskDetail = (data, firebaseKey) => {
        navigation.navigate("TaskDetail", { data, firebaseKey })
    }


    console.log(task, "Task");
    let keys = Object.keys(task)
    console.log(keys, "Keys");

    return (
        // <>
        //     <Text style={{ fontSize: 30, marginTop: vh * 0.03, paddingHorizontal: 8, }}>
        //         All Tasks
        //     </Text>
        //     <ScrollView contentContainerStyle={Styles.container}>

        //         {
        //             keys.map((items, index) => {
        //                 let email = firebase.auth().currentUser.email
        //                 if (task[items].status === "succes" && task[items]?.isAssigned?.email === email) {
        //                     return (
        //                         <View
        //                             key={index}
        //                             style={{ borderWidth: 1, marginVertical: 10, borderRadius: 5, elevation: 5 }} >
        //                             <View
        //                                 style={{ paddingHorizontal: 8, paddingVertical: 5 }}
        //                             >
        //                                 <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        //                                     Title: {task[items].title}
        //                                 </Text>
        //                                 <Text style={{ fontSize: 16, fontWeight: "bold" }}>
        //                                     Assigned Date:{new Date().toLocaleDateString()}
        //                                 </Text>
        //                                 <Text style={{ fontSize: 18, fontWeight: "bold" }}>Assigned To: {task[items].isAssigned.name}</Text>
        //                                 <Text style={{ fontSize: 18, fontWeight: "bold" }}>Status:{task[items].status}</Text>
        //                             </View>
        //                             <View style={{ flexDirection: 'row', borderTopWidth: 1, justifyContent: "center" }}>
        //                                 <TouchableOpacity
        //                                     onPress={() => openTaskDetail(task[items], items)}
        //                                     style={{ flex: 0.30, justifyContent: "center", alignItems: "center", borderRightWidth: 1, borderLeftWidth: 1, paddingVertical: 5 }}>
        //                                     <Text>View Details</Text>
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
                        let email = firebase.auth().currentUser.email
                        if (task[items].status === "succes" && task[items]?.isAssigned?.email === email) {
                            return (
                                <View
                                    key={index}
                                    style={{ borderWidth: 1, marginVertical: 10, borderRadius: 5, elevation: 5 }} >
                                    <View
                                        style={{ paddingHorizontal: 8, paddingVertical: 5 }}
                                    >
                                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                                            Title:<Text style={{ fontWeight: "normal", fontSize: 17 }}> {task[items].title}</Text>
                                        </Text>
                                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                                            Assigned Date: <Text style={{ fontWeight: "normal", fontSize: 15 }}>{task[items].date}</Text>
                                        </Text>
                                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Assigned To: <Text style={{ fontWeight: "normal", fontSize: 17 }}>{task[items]?.isAssigned?.name}</Text></Text>
                                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Status: <Text style={{ fontWeight: "normal", fontSize: 17 }}>{task[items].status}</Text></Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', borderTopWidth: 1, justifyContent: "center" }}>
                                        <TouchableOpacity
                                            onPress={() => openTaskDetail(task[items], items)}
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

// const Styles = StyleSheet.create({
//     container: {
//         flexGrow: 1,
//         alignItems: "center",
//         height: vh
//     }
// })
const Styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        // alignItems: "center"
        marginHorizontal: 10
    }
})
export default Completed