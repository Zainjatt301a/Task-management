import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Home, CreateTask, Completed, UnAssigned, AdminProfile, AdminTaskDetail } from '../../containers';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Ionicons, Entypo } from '@expo/vector-icons';
import { headerColor } from '../../constants';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

function AdminStack() {

    const TopTabTasks = () => {
        return (
            <TopTab.Navigator>
                <TopTab.Screen name="completed" component={Completed} />
                <TopTab.Screen name="UnAssigned" component={UnAssigned} />
            </TopTab.Navigator>
        );
    }

    const HomeStack = () => {
        return (
            <Stack.Navigator
                initialRouteName='home'

            >
                <Stack.Screen name='home' component={Home}
                    options={{
                        headerShown: true,
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
                <Stack.Screen name='adminTaskDetail' component={AdminTaskDetail}
                    options={{

                        headerShown: true,
                        title: "Task Detail",
                        headerStyle: {
                            backgroundColor: headerColor
                        },
                        headerTitleStyle: {
                            color: "white",
                            alignItems: "center"
                        },
                        headerBackTitleStyle: {
                            color: "white"
                        },
                        headerTintColor: "white"
                    }} />
            </Stack.Navigator>
        )
    }

    return (

        <Tab.Navigator
            initialRouteName='HomeStack'
            screenOptions={{
                tabBarHideOnKeyboard: true,
                tabBarActiveBackgroundColor: headerColor,
                tabBarActiveTintColor: "white"
            }}

        >
            <Tab.Screen name="HomeStack" component={HomeStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => { return < AntDesign name="home" size={24} color={focused && "white"} /> }
                }}
            />
            <Tab.Screen name="CreateTask" component={CreateTask}
                options={{
                    tabBarIcon: ({ focused }) => { return <Ionicons name="create-outline" size={24} color={focused && "white"} /> },
                    title: "Create a Task",
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: headerColor,

                    },
                    headerTitleStyle: {
                        color: "white"
                    }
                }}
            />
            <Tab.Screen name="TopTabTasks" component={TopTabTasks}
                options={{
                    tabBarIcon: ({ focused }) => { return <Ionicons name="ios-cloud-done-outline" size={24} color={focused && "white"} /> },
                    title: "Tasks",
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: headerColor,

                    },
                    headerTitleStyle: {
                        color: "white"
                    }
                }}
            />
            <Tab.Screen name="AdminProfile" component={AdminProfile}
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

export default AdminStack