/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import TabBar from "./TabBar"

import Home from "../src/screens/Home"
import Cart from "../src/screens/Cart"

const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator tabBarOptions={{}} initialRouteName="Home" tabBar={(props) => <TabBar {...props} />}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Cart" component={Cart} />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator
