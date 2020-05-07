import React, { useContext, memo } from "react"
import { TouchableOpacity } from "react-native"
import styled from "@emotion/native"

import { AppContext } from "../Main"

const Text = styled.Text(({ theme }) => ({
    color: theme.main.color,
}))

const Cart = memo(({ navigation, withCart }) => {
    const { items } = useContext(AppContext)

    if (items && items.length === 0) {
        return <Text />
    }

    if (!withCart) {
        return <Text />
    }

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("CartPage")
            }}>
            <Text>Cart: {items.length}</Text>
        </TouchableOpacity>
    )
})

export default Cart
