import React, { memo } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { useRoute } from "@react-navigation/native"
import styled from "@emotion/native"

import Cart from "./Cart"

const StyledText = styled(Text)(({ theme }) => ({
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
                paddingTop: 20,
                paddingBottom: 20,
            }}>
            <View>
                {navigation.canGoBack() && (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack()
                        }}>
                        <StyledText>Back</StyledText>
                    </TouchableOpacity>
                )}
            </View>
            <View>
                <StyledText>{route.name}</StyledText>
            </View>
            <View>
                <Cart />
            </View>
        </View>
    )
})

export default Header
