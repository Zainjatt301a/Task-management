import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { vh, vw } from '../../constants'
import firebase from 'firebase'

const UnAssigned = () => {

    const [tasks, setTasks] = useState({})

    useEffect(() => {
        getUnAssignedTask()
    }, [])

    const getUnAssignedTask = () => {
        firebase.database().ref("Tasks")
            .on("value", snapshot => {
                // console.log(snapshot.val(), "Snapshot");
                let temp = snapshot.val() ? snapshot.val() : {}
                setTasks(temp)
            })
    }

    const items = [
        {
            title: "Task1"
        },
        {
            title: "Task2"
        },
        {
            title: "Task3"
        },
        {
            title: "Task4"
        },
        {
            title: "Task5"
        },

    ]

    console.log(tasks, "Tasks");
    let keys = Object.keys(tasks)
    console.log(keys, "keys");

    return (

        <ScrollView contentContainerStyle={Styles.container}>

            {
                keys.map((items, index) => {
                    if (tasks[items].isAssigned == null) {
                        return (

                            <View
                                key={index}
                                style={Styles.cardMain}>
                                <Text style={{ marginHorizontal: 10 }}>{tasks[items].title}</Text>
                            </View>

                        )
                    }
                })
            }

        </ScrollView>


    )
}

const Styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: "center",
        height: vh
    },
    cardMain: {
        flex: 0.1,
        elevation: 5,
        marginVertical: 5,
        width: vw * 0.9,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default UnAssigned