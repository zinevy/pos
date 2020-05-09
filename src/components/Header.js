import React, { memo, useState, useEffect, useMemo } from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { useRoute } from "@react-navigation/native"
import styled from "@emotion/native"
import { useTheme } from "emotion-theming"

import Counter from "./Cart/Counter"
import hexToRGB from "../../utils/hexToRGBA"

const routes = {
    Home: "Home",
    Settings: "Settings",
    Cart: "Cart",
    ProductDetails: "Product Details",
    CartPage: "Cart",
}

const Container = styled.View(({ theme }) => ({
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 20,
    paddingTop: 10,
    backgroundColor: hexToRGB(theme.main.backgroundColor, 0.8),
    zIndex: 9,
}))

const Text = styled.Text(({ theme }) => ({
    color: theme.main.color,
}))

const styles = {
    header: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
}

const Header = memo(({ navigation, withCart, withBack }) => {
    const route = useRoute()
    // const theme = useTheme()
    // const [title, setTitle] = useState(routes[route.name])

    // useEffect(() => {
    //     if (route.params && route.params.title) {
    //         setTitle(route.params.title)
    //     }
    // }, [])

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
            <View style={{ ...styles.header, alignItems: "flex-end" }}>
                <Counter withCart={withCart} />
            </View>
        </Container>
    )
})

export default Header
