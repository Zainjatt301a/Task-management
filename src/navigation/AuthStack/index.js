import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Register } from '../../containers';
import { headerColor } from '../../constants';

const Stack = createStackNavigator();

function AuthStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="login"
                component={Login}
                options={{
                    headerShown: true,
                    title: "Login",
                    headerStyle: {
                        backgroundColor: headerColor,
                    },
                    headerTitleStyle: {
                        color: "white"
                    }
                }}

            />
            <Stack.Screen
                name="register"
                component={Register}
                options={{
                    headerShown: true,
                    title: "Sign Up",
                    headerStyle: {
                        backgroundColor: headerColor,
                    },
                    headerTitleStyle: {
                        color: "white"
                    }
                }}
            />
        </Stack.Navigator>
    );
}

export default AuthStack