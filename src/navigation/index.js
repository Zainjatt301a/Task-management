import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { ActivityIndicator, Image } from 'react-native';
import { headerColor, vh, vw } from '../constants';
import { View } from 'react-native';
import AdminStack from './AdminStack';
import firebase from 'firebase';

export default function Navigation() {
    const [component, setComponent] =
        useState(
            <ActivityIndicator color={headerColor} size={'small'}
                style={{ flex: 1 }}
                animating={true}
            />
            // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
            //     <Image source={{ uri: "https://stackideas.cachefly.net/images/apps/2429/logo.png" }} style={{ width: vw * 1, height: vh * 0.57 }} />
            // </View>
        )

    useEffect(() => {
        setTimeout(() => {
            firebase.auth().onAuthStateChanged(user => {
                console.log(user, 'usseee');
                if (user) {
                    firebase.database().ref(`users/${user.uid}`).on('value', snapshot => {
                        console.log(snapshot, 'sss');
                        if (snapshot.val()?.email == 'admin@admin.com') {
                            setComponent(<AdminStack />)
                        }
                        else {
                            setComponent(<AppStack />)
                        }
                    })
                }
                else {
                    setComponent(<AuthStack />)
                }
            })
        }, 1000);
    }, [])



    return (
        <NavigationContainer>
            {/* <AuthStack /> */}
            {/* <AppStack /> */}
            {/* <AdminStack /> */}
            {component}
        </NavigationContainer>
    );
}