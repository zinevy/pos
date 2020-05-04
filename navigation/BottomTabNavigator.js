/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import TabBar from "./TabBar"

import Links from "../src/screens/Links"
import Home from "../src/screens/Home"
import { View } from "react-native"

const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator tabBarOptions={{}} initialRouteName="Home" tabBar={(props) => <TabBar {...props} />}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Links" component={Links} />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator
