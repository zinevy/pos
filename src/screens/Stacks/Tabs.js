import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import TabNavigation from "./TabNavigation"
import Home from "../Home"
import Settings from "../Settings"
import SalesStackScreen from "./Sales"

const Tab = createBottomTabNavigator()

const HomeTabs = () => {
    return (
        <Tab.Navigator tabBarOptions={{}} initialRouteName="Home" tabBar={(props) => <TabNavigation {...props} />}>
            <Tab.Screen name="Home" component={Home} options={{ icon: "house-user" }} />
            <Tab.Screen name="Sales" component={SalesStackScreen} options={{ icon: "chart-line" }} />
            <Tab.Screen name="Settings" component={Settings} options={{ icon: "ellipsis-h" }} />
        </Tab.Navigator>
    )
}
export default HomeTabs
