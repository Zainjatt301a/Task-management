import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native'
import { headerColor, vh, vw } from '../../constants'
import { TextInputs, Button } from '../../components'
import { Picker } from '@react-native-picker/picker'
import firebase from 'firebase'

const CreateTask = () => {

    const [userData, setUserData] = useState({})
    // const [keys, setKeys] = useState()

    useEffect(() => {
        getUserData()
    }, [])

    const getUserData = () => {
        firebase.database().ref(`users`)
            .on("value", snapshot => {
                // console.log(snapshot.val(), "Valuesssssssss");
                let temp = snapshot.val()
                // console.log(temp, "Temp");
                // temp.push(snapshot.val())
                setUserData(temp)
                // console.log(temp, "Temp");
                // temp.forEach((Item) => {
                //     // console.log(Item, "Item");
                //     setUserData(Item)
                // })

            })

    }
    const [inputs, setInputs] = useState({
        title: "",
        description: ""
    })

    const onChangeHandler = (name, value) => {
        setInputs({
            ...inputs,
            [name]: value
        })
    }
    // const [title, setTitle] = useState("")
    // const [description, setDescription] = useState("")
    const [image, setImage] = useState()

    // console.log(title, description, image, "States");
    // const [taskRelated, setTaskRelated] = useState("");
    const [user, setUser] = useState("")
    console.log(inputs.title, inputs.description, user, "States  ")
    const postTaskData = () => {

        firebase.database().ref(`Tasks`)
            .push({
                title: inputs.title,
                description: inputs.description,
                isAssigned: user,
                status: "pending",
                date: new Date().toLocaleDateString()
            })
            .then(response => {
                setInputs({})
                isAssigned: { }
                console.log("RESPONSEEEE", response);
            })
            .catch(err => {
                console.log("errrrrrrr", err);
            })
    }

    // console.log(userData, "UserData");

    let keys = Object.keys(userData)
    // console.log(keys, "Keys");
    return (
        <>
            <Text style={{ fontSize: 30, marginTop: vh * 0.03, marginHorizontal: 10 }}>
                Create Task
            </Text>

            <ScrollView contentContainerStyle={Styles.container}>

                <View style={{ flex: 0.25 }}>
                    <Text style={{ textAlign: "center" }}>Title</Text>
                    <TextInputs
                        value={inputs.title}
                        onChangeText={(text) => onChangeHandler("title", text)} placeholder="Write title"
                    />
                </View>
                <View style={{ flex: 0.40 }}>
                    <Text style={{ textAlign: "center", marginVertical: 10 }}>Detail</Text>
                    <TextInputs
                        value={inputs.description}
                        onChangeText={(text) => onChangeHandler("description", text)}
                        placeholder="Write Detail"
                        borderWidth={1}
                    />
                    {/* <RichTextEditor /> */}
                </View>
                {/* <View style={Styles.dropdown} >
                    <Text style={{ textAlign: "center" }}>Task</Text>
                    <Picker
                        selectedValue={taskRelated}
                        style={{}}
                        onValueChange={(value) => setTaskRelated(value)}

                    >
                        <Picker.Item label="Office" value="Office" />
                        <Picker.Item label="Home" value="Home" />
                        <Picker.Item label="Bank" value="Bank" />
                        <Picker.Item label="TCS" value="Shipping" />
                    </Picker>
                </View> */}


                <View style={Styles.dropdown} >
                    <Text style={{ textAlign: "center" }}>Users</Text>
                    <Picker
                        selectedValue={user}
                        style={{}}
                        onValueChange={(value) => setUser(value)}

                    >
                        {keys.map((val, index) => {
                            if (val != firebase.auth().currentUser.uid) {
                                return <Picker.Item key={index} label={userData[val].name} value={userData[val]} />
                            }
                        })
                        }
                    </Picker>
                </View>
                <View style={{ flex: 0.30, marginTop: vh * 0.02 }}>
                    <Button onPress={postTaskData} name="Post" color={headerColor} />
                </View>

            </ScrollView>

        </>
    )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: vh * 0.08
    },
    dropdown: {
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: "center",
        flex: 0.20,
        borderColor: headerColor,
        marginTop: vh * 0.03
    }
})

export default CreateTask