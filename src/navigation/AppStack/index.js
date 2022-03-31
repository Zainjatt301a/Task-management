import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { userHome, TaskDetail, userCompleted, Profile } from '../../containers';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Ionicons, Entypo } from '@expo/vector-icons';
import { headerColor } from '../../constants';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

function AppStack() {

    const HomeStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={userHome}
                    options={{
                        headerShown: true,
                        title: "Home",
                        headerStyle: {
                            backgroundColor: headerColor,
                        },
                        headerTitleStyle: {
                            color: "white"
                        }
                    }}
                />
                <Stack.Screen
                    name="TaskDetail"
                    component={TaskDetail}
                    options={{
                        headerShown: true,
                        title: "Task Detail",
                        headerStyle: {
                            backgroundColor: headerColor,
                        },
                        headerTitleStyle: {
                            color: "white"
                        },
                        headerTintColor: "white"
                    }}
                />
            </Stack.Navigator>
        )
    }

    return (

        <Tab.Navigator
            initialRouteName='homeStack'
            screenOptions={{
                tabBarHideOnKeyboard: true,
                tabBarActiveBackgroundColor: headerColor,
                tabBarActiveTintColor: "white"
            }}

        >
            <Tab.Screen name="homeStack" component={HomeStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => { return < AntDesign name="home" size={24} color={focused && "white"} /> },
                    title: "Home",
                    headerStyle: {
                        backgroundColor: headerColor
                    },
                    headerTitleStyle: {
                        color: "white",
                        alignItems: "center"
                    }
                }}
            />
            <Tab.Screen name="Completed" component={userCompleted}
                options={{
                    tabBarIcon: ({ focused }) => { return <Ionicons name="ios-cloud-done-outline" size={24} color={focused && "white"} /> },
                    title: "Completed",
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: headerColor,

                    },
                    headerTitleStyle: {
                        color: "white"
                    }
                }}
            />
            <Tab.Screen name="Profile" component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => { return < AntDesign name="profile" size={24} color={focused && "white"} /> },
                    title: "Profile",
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: headerColor,

                    },
                    headerTitleStyle: {
                        color: "white"
                    }
                }}
            />
        </Tab.Navigator>
    );
}

export default AppStack