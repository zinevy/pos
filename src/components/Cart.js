import React, { useContext, memo } from "react"
import { View, Text } from "react-native"
import styled from "@emotion/native"

import { AppContext } from "../Main"

const StyledText = styled(Text)(({ theme }) => ({
    color: theme.main.color,
}))

const Cart = memo(() => {
    const { items } = useContext(AppContext)

    return (
        <View>
            <StyledText>Cart: {items.length}</StyledText>
        </View>
    )
})

export default Cart
