import React, { useContext, memo } from "react"
import { View } from "react-native"
import styled from "@emotion/native"

import { AppContext } from "../Main"

const Text = styled.Text(({ theme }) => ({
    color: theme.main.color,
}))

const Cart = memo(() => {
    const { items } = useContext(AppContext)

    return (
        <View>
            <Text>Cart: {items.length}</Text>
        </View>
    )
})

export default Cart
