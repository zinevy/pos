import React, { memo } from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { useRoute } from "@react-navigation/native"
import styled from "@emotion/native"
import { useTheme } from "emotion-theming"

import Cart from "./Cart"
import hexToRGB from "../../utils/hexToRGBA"

const Text = styled.Text(({ theme }) => ({
    color: theme.main.color,
}))

const styles = StyleSheet.create({
    header: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
})

const Header = memo(({ navigation, withCart }) => {
    const route = useRoute()
    const theme = useTheme()

    return (
        <View
            style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                padding: 15,
                backgroundColor: hexToRGB(theme.main.backgroundColor, 0.8),
                zIndex: 9,
            }}>
            <View style={{ ...styles.header, alignItems: "flex-start" }}>
                {navigation.canGoBack() ? (
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
                <Text>{route.name}</Text>
            </View>
            <View style={{ ...styles.header, alignItems: "flex-end" }}>
                <Cart navigation={navigation} withCart={withCart} />
            </View>
        </View>
    )
})

export default Header
