import React, { memo } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"

import BottomTabNavigator from "../navigation/BottomTabNavigator"

// Screens
import ProductDetails from "./screens/Products/product"
import SignInScreen from "./screens/SignIn"
import RegistrationScreen from "./screens/Register"
import Cart from "./screens/Cart"

const Stack = createStackNavigator()

const withAuth = (InnerComponent) => {
    const Page = memo((props) => {
        const { app } = props

        if (!Object.keys(app).includes("userToken")) {
            return null
        }

        return <InnerComponent {...props} />
    })
    return Page
}

const RootNavigator = memo(({ app }) => {
    if (!app.userToken && typeof app.userToken === "object") {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerMode: "none", headerShown: false }}>
                    <Stack.Screen
                        name="SignIn"
                        component={SignInScreen}
                        options={{
                            animationTypeForReplace: app.isSignout ? "pop" : "push",
                        }}
                    />
                    <Stack.Screen
                        name="Registration"
                        component={RegistrationScreen}
                        options={{
                            animationTypeForReplace: "pop",
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerMode: "none", headerShown: false }}>
                <Stack.Screen
                    options={{
                        ...TransitionPresets.ModalTransition,
                    }}
                    name="Root"
                    component={BottomTabNavigator}
                />
                <Stack.Screen label="Product Details" name="ProductDetails" component={ProductDetails} />
                <Stack.Screen label="Cart" name="Cart" component={Cart} />
            </Stack.Navigator>
        </NavigationContainer>
    )
})

export default withAuth(RootNavigator)
