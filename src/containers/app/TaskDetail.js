import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { headerColor, vh, vw } from '../../constants'
import firebase from 'firebase'

const TaskDetail = ({ route, navigation }) => {
    // console.log(route.params.tasks, "Route");
    const { data, firebaseKey } = route.params
    console.log(data, firebaseKey, "Params");

    const taskCompleted = () => {
        firebase.database().ref(`Tasks/${firebaseKey}`).update({
            status: "succes"
        })
    }

    return (
        <>
            <Text style={{ fontSize: 30, marginVertical: 10, marginHorizontal: 5 }}>
                Task Details
            </Text>



            <ScrollView contentContainerStyle={Styles.container}>
                {/* <View style={{ justifyContent: "center", alignItems: "center", marginVertical: 10 }}>
                    <Text style={{ fontSize: 18, marginVertical: 10, fontWeight: "bold" }}>Title:</Text>
                    <Text style={{ fontSize: 15, color: "#566573" }}>{data.title}</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 18, marginVertical: 10, fontWeight: "bold" }}>
                        Description:
                    </Text>
                    <View style={{ width: vw * 0.9 }}>
                        <Text style={{ fontSize: 15, color: "#566573", textAlign: "justify", lineHeight: 25 }}>
                            {data.description}
                        </Text>
                    </View>
                    <Text style={{ fontSize: 18, marginVertical: 10, fontWeight: "bold" }}>
                        Assigned Date:
                    </Text>
                    <Text style={{ fontSize: 15, color: "#566573" }}>
                        {new Date().toLocaleDateString()}
                    </Text>
                    <Text style={{ fontSize: 18, marginVertical: 10, fontWeight: "bold" }}>
                        Status:
                    </Text>
                    <Text style={{ fontSize: 15, color: "#566573" }}>
                        {data.status}
                    </Text>
                </View> */}
                <View style={{ justifyContent: "center", marginVertical: 10, marginHorizontal: 10 }}>
                    <Text style={{ fontSize: 18, marginVertical: 10, fontWeight: "bold" }}>Title:</Text>
                    <Text style={{ fontSize: 15, color: "#566573" }}>{data.title}</Text>
                </View>
                <View style={{ marginHorizontal: 10 }}>
                    <Text style={{ fontSize: 18, marginVertical: 10, fontWeight: "bold" }}>
                        Description:
                    </Text>
                    <View style={{ width: vw * 0.9 }}>
                        <Text style={{ fontSize: 15, color: "#566573", textAlign: "justify", lineHeight: 25 }}>
                            {data.description}
                        </Text>
                    </View>
                    <Text style={{ fontSize: 18, marginVertical: 10, fontWeight: "bold" }}>
                        Assigned to:
                    </Text>
                    <Text style={{ fontSize: 15, color: "#566573" }}>
                        {data.isAssigned?.name}
                    </Text>
                    <Text style={{ fontSize: 18, marginVertical: 10, fontWeight: "bold" }}>
                        Created Date:
                    </Text>
                    <Text style={{ fontSize: 15, color: "#566573" }}>
                        {new Date().toLocaleDateString()}
                    </Text>
                    <Text style={{ fontSize: 18, marginVertical: 10, fontWeight: "bold" }}>
                        Status:
                    </Text>
                    <Text style={{ fontSize: 15, color: "#566573" }}>
                        {data.status}
                    </Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "center", marginHorizontal: 20, marginVertical: 10 }}>

                    <TouchableOpacity
                        onPress={taskCompleted}
                        style={Styles.buttonStyle}>
                        {data.status === "succes" ?
                            <Text style={{ color: "white" }}>
                                Completed
                            </Text>
                            :
                            <Text style={{ color: "white" }}>
                                Mark as done
                            </Text>
                        }
                    </TouchableOpacity>
                </View>
            </ScrollView >
        </>
    )

}

const Styles = StyleSheet.create({
    container: {
        flexGrow: 1
    },
    buttonStyle: {
        marginHorizontal: 10,
        backgroundColor: headerColor,
        flex: 0.4,
        height: vh * 0.05,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5
    }
})

export default TaskDetail