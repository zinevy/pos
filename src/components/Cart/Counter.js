import React, { useContext, memo } from "react"
import { TouchableOpacity } from "react-native"
import styled from "@emotion/native"

import { AppContext } from "../../Main"
import { useNavigation } from "@react-navigation/native"

const Text = styled.Text(({ theme }) => ({
    color: theme.main.color,
}))

const Counter = memo(({ withCart }) => {
    const { items } = useContext(AppContext)
    const navigation = useNavigation()

    if (items && items.length === 0) {
        return <Text />
    }

    if (!withCart) {
        return <Text />
    }

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("CartPage", { title: "Cart" })
            }}>
            <Text>Cart: {items.length}</Text>
        </TouchableOpacity>
    )
})

export default Counter
