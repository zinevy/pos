/* eslint-disable react/prop-types */
import React, { useContext } from "react"
import { Text, View, TouchableOpacity } from "react-native"
import styled from "@emotion/native"

import withScreen from "../../../utils/hoc/createScreen"
import { AppContext } from "../../Main"

const Wrapper = styled(View)({
    alignItems: "center",
})

const Product = ({ route }) => {
    const item = route.params
    const { addToCart } = useContext(AppContext)

    return (
        <Wrapper>
            <View>
                <Text>Hello {item.first_name}</Text>
                <TouchableOpacity
                    onPress={() => {
                        addToCart(item)
                    }}>
                    <Text>Add to cart</Text>
                </TouchableOpacity>
            </View>
        </Wrapper>
    )
}

export default withScreen()(Product)
