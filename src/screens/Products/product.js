import React, { useContext } from "react"
import { View, TouchableOpacity } from "react-native"
import styled from "@emotion/native"

import withScreen from "../../../utils/hoc/createScreen"
import { AppContext } from "../../Main"

const Text = styled.Text(({ theme }) => ({
    color: theme.main.color,
}))

const Product = ({ route }) => {
    const item = route.params
    const { addToCart } = useContext(AppContext)

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

export default withScreen()(Product)
