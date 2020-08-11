import React, { memo } from "react"
import { View, TouchableOpacity } from "react-native"
import { useRoute } from "@react-navigation/native"
import styled from "@emotion/native"
import { Icon } from "react-native-elements"

import { Text } from "../components"
import { normalize } from "../../utils/scale"
import AppIcon from "./Icon"

const routes = {
    Home: "Home",
    Settings: "Settings",
    Sales: "Sales",
    Cart: "Cart",
    CheckoutPage: "Checkout",
    ProductDetails: "Product Details",
    CartPage: "Cart",
    BluetoothDevices: "Devices",
}

const Container = styled.View(({ theme }) => ({
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    paddingLeft: normalize(10),
    paddingRight: normalize(10),
    zIndex: 9,
}))

const styles = {
    header: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
}

const Header = memo(({ navigation, withBack }) => {
    const route = useRoute()

    return (
        <Container>
            <View style={{ ...styles.header, alignItems: "flex-start" }}>
                {withBack && navigation.canGoBack() ? (
                    <AppIcon
                        onPress={() => navigation.goBack()}
                        name="chevron-left"
                        type="feather"
                        size={normalize(26)}
                    />
                ) : (
                    <Text />
                )}
            </View>
            <View style={{ ...styles.header, alignItems: "center" }}>
                <Text>{routes[route.name]}</Text>
            </View>
            <View style={{ ...styles.header, alignItems: "flex-end" }}></View>
        </Container>
    )
})

export default Header
