import React, { memo } from "react"
import { View, TouchableOpacity } from "react-native"
import { useRoute } from "@react-navigation/native"
import styled from "@emotion/native"

import Cart from "./Cart"

const Text = styled.Text(({ theme }) => ({
    color: theme.main.color,
}))

const Header = memo(({ navigation }) => {
    const route = useRoute()

    return (
        <View
            style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                paddingTop: 10,
                paddingBottom: 10,
            }}>
            <View>
                {navigation.canGoBack() && (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack()
                        }}>
                        <Text>Back</Text>
                    </TouchableOpacity>
                )}
            </View>
            <View>
                <Text>{route.name}</Text>
            </View>
            <View>
                <Cart />
            </View>
        </View>
    )
})

export default Header
