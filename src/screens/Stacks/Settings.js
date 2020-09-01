import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import BluetoothSettings from "../BluetoothSettings"

const SettingsStack = createStackNavigator()

const SettingsStackScreen = () => {
    return (
        <SettingsStack.Navigator screenOptions={{ headerMode: "none", headerShown: false }}>
            <SettingsStack.Screen name="BluetoothDevices" component={BluetoothSettings} />
        </SettingsStack.Navigator>
    )
}

export default SettingsStackScreen
