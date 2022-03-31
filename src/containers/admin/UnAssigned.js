import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, Pressable } from 'react-native'
import { vh, vw } from '../../constants'
import firebase from 'firebase'
import { Picker } from '@react-native-picker/picker'
import { headerColor } from '../../constants'


const UnAssigned = () => {

    const [tasks, setTasks] = useState({})
    const [user, setUser] = useState({})
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        getUnAssignedTask()
        getUsers()
    }, [])

    const getUnAssignedTask = () => {
        firebase.database().ref("Tasks")
            .on("value", snapshot => {
                // console.log(snapshot.val(), "Snapshot");
                let temp = snapshot.val() ? snapshot.val() : {}
                setTasks(temp)
            })
    }

    const getUsers = () => {
        firebase.database().ref(`users`)
            .on("value", snapshot => {
                // console.log(snapshot.val(), "Snapshot");
                let temp = snapshot.val() ? snapshot.val() : {}
                setUser(temp)
            })
    }


    console.log(tasks, "Tasks");
    let keys = Object.keys(tasks)
    console.log(keys, "keys");

    const picker = (key) => {
        // setShowModal(true)
        // alert("pick")
        setSelectedTask(key)
        setModalVisible(true)
    }

    const taskReAssigned = (selectedUSer) => {
        firebase.database().ref(`Tasks/${selectedTask}`).update({
            isAssigned: selectedUSer
        })
        setModalVisible(!modalVisible)
    }
    console.log(user, "Users");
    let userKeys = Object.keys(user)
    console.log(userKeys, "Keys");
    return (

        <ScrollView contentContainerStyle={styles.container}>

            {
                keys.map((items, index) => {
                    if (tasks[items].isAssigned == null) {
                        return (
                            <View
                                key={index}
                                style={{ flex: 0.1, elevation: 5, marginVertical: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderWidth: 1, borderRadius: 10, width: vw * 0.9 }}>
                                <Text style={{ marginHorizontal: 10 }}>{tasks[items].title}</Text>
                                <TouchableOpacity
                                    onPress={_ => picker(items)}
                                    style={styles.buttonStyle}>
                                    <Text style={{ color: "white" }}>Assign</Text>
                                </TouchableOpacity>
                            </View>

                        )
                    }
                })
            }

            {

                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalView}>

                            {userKeys.map((val, index) => {
                                if (user[val].email !== 'admin@admin.com') {
                                    return (

                                        <TouchableOpacity
                                            key={index}
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={_ => taskReAssigned(user[val])}
                                            activeOpacity={1}
                                        >
                                            <Text style={styles.textStyle}>{user[val].name}</Text>
                                        </TouchableOpacity>

                                    )
                                }
                            })}
                        </TouchableOpacity>


                    </Modal>
                </View>
            }


        </ScrollView >


    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: "center",
        height: vh
    },
    buttonStyle: {
        backgroundColor: headerColor,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        padding: 10,
        marginRight: vw * 0.02,
        marginLeft: vw * 0.2
    },
    dropdown: {
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: "center",
        borderColor: headerColor,
        marginTop: vh * 0.03,
        width: vw * 0.5
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        // backgroundColor: "red"
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 55,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginTop: vh * 0.1,
        paddingVertical: 60,
        // backgroundColor: "blue"
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: headerColor,
        marginVertical: 5,
        width: vw * 0.4
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },

})

export default UnAssigned