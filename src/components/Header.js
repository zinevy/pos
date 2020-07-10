import React, { memo } from "react"
import { View, TouchableOpacity } from "react-native"
import { useRoute } from "@react-navigation/native"
import styled from "@emotion/native"

import { Text } from "../components"
import hexToRGB from "../../utils/hexToRGBA"
import { normalize } from "../../utils/scale"

const routes = {
    Home: "Home",
    Settings: "Settings",
    Sales: "Sales",
    Cart: "Cart",
    ProductDetails: "Product Details",
    CartPage: "Cart",
}

const Container = styled.View(({ theme }) => ({
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: normalize(20),
    paddingLeft: normalize(20),
    paddingRight: normalize(20),
    backgroundColor: hexToRGB(theme.main.backgroundColor, 0.8),
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
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack()
                        }}>
                        <Text>Back</Text>
                    </TouchableOpacity>
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
