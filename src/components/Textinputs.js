import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { vh } from '../constants'

const TextInputs = ({ placeholder, value, onChangeText, secureTextEntry, borderWidth, keyboardType }) => {
    return (
        <View>
            <TextInput placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                style={{ ...Styles.textInput, borderWidth: borderWidth, textAlignVertical: "top" }}
                keyboardType={keyboardType}
                multiline={true}
            />
        </View>
    )
}

const Styles = StyleSheet.create({
    textInput: {
        borderColor: "#F76756",
        borderBottomWidth: 1,
        padding: 5,
        marginHorizontal: 20,
        borderRadius: 5
    }
})

export default TextInputs