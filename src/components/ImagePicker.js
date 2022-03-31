import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { vh } from '../constants';
import { AntDesign } from '@expo/vector-icons';

export default function ImagePickers({ width, borderRadius, height, title, picImage, type, val }) {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });

        // console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
            let base64Img = `data:image/jpg;base64,${result.base64}`
            picImage(base64Img)
        }
    };

    const renderUploadForRegister = () => {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: "row" }}>
                {image ? <Image source={{ uri: image }} style={{ ...Styles.ImageProps, width: width, borderRadius: borderRadius, height: height }} /> :
                    <Image source={{ uri: "https://cdn5.vectorstock.com/i/1000x1000/50/29/user-icon-male-person-symbol-profile-avatar-vector-20715029.jpg" }} style={{ ...Styles.ImageProps, width: width, borderRadius: borderRadius, height: height }} />}
                {/* <Button title={title} onPress={pickImage} /> */}
                <AntDesign name="clouduploado" style={{ marginLeft: 5 }} size={25} color="black" onPress={pickImage} />
            </View>
        )
    }

    return (
        // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //     <Button title={title} onPress={pickImage} />
        //     {image ? <Image source={{ uri: image }} style={{ ...Styles.ImageProps, width: width, borderRadius: borderRadius, height: height }} /> :
        //         <Image source={{ uri: "https://cdn5.vectorstock.com/i/1000x1000/50/29/user-icon-male-person-symbol-profile-avatar-vector-20715029.jpg" }} style={{ ...Styles.ImageProps, width: width, borderRadius: borderRadius, height: height }} />}
        // </View>
        <View>
            {
                type === "profile" ?
                    <TouchableOpacity onPress={pickImage}>
                        <Image source={{ uri: val }} style={{ ...Styles.ImageProps, width: width, borderRadius: borderRadius, height: height }} />
                    </TouchableOpacity>
                    : renderUploadForRegister()
            }

        </View>
    );
}

const Styles = StyleSheet.create({
    ImageProps: {
        width: 70,
        height: 70,
        borderRadius: 100
    }
})