/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import TabBar from "./TabBar"

import Home from "../src/screens/Home"
import Settings from "../src/screens/Settings"
import Sales from "../src/screens/Sales"

const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator tabBarOptions={{}} initialRouteName="Home" tabBar={(props) => <TabBar {...props} />}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Sales" component={Sales} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator
