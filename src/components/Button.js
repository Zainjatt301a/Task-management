import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'


const Button = ({ name, onPress, color, pic }) => {
    // console.log(color, "colorcolorcolor");


    return (
        <TouchableOpacity onPress={onPress} style={{ ...Style.container, backgroundColor: color }}>
            {/* <Image source={pic} style={{ width: 25, height: 25 }} /> */}
            {pic}
            <Text style={Style.textColor}>
                {name}
            </Text>
        </TouchableOpacity >
    )
}

const Style = StyleSheet.create({
    container: {
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
        borderRadius: 10,
        flexDirection: "row"
    },
    textColor: {
        color: "white",
        fontSize: 18

    }
})
export default Button