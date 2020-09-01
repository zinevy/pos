import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import Details from "../Product/Details"
import CartPage from "../CartPage"
import Checkout from "../Checkout"
import Sales from "../Sales"

const SalesStack = createStackNavigator()

const SalesStackScreen = () => {
    return (
        <SalesStack.Navigator screenOptions={{ headerMode: "none", headerShown: false }}>
            <SalesStack.Screen name="Sales" component={Sales} />
            <SalesStack.Screen name="ProductDetails" component={Details} />
            <SalesStack.Screen name="CartPage" component={CartPage} />
            <SalesStack.Screen name="CheckoutPage" component={Checkout} />
        </SalesStack.Navigator>
    )
}

export default SalesStackScreen
