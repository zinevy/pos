import React from "react"
import { View, TouchableOpacity } from "react-native"
import styled from "@emotion/native"

import withScreen from "../../../utils/hoc/createScreen"
import withAppContext from "../../../utils/hoc/withAppContext"

const Text = styled.Text(({ theme }) => ({
    color: theme.main.color,
}))

const Product = ({ route, addToCart }) => {
    const item = route.params

    return (
        <View>
            <Text>{item.name}</Text>
            <TouchableOpacity
                onPress={() => {
                    item.quantity = 1
                    addToCart(item)
                }}>
                <Text>Add to cart</Text>
            </TouchableOpacity>
        </View>
    )
}
const mapContext = ({ addToCart }) => ({
    addToCart,
})
const withAppContextProduct = withAppContext(mapContext)(Product)

export default withScreen()(withAppContextProduct)
