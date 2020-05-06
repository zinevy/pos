import React, { useContext, memo } from "react"
import { View, TouchableOpacity, Image } from "react-native"
import styled from "@emotion/native"
import { useNavigation } from "@react-navigation/native"

import withScreen from "../../utils/hoc/createScreen"
import { AppContext } from "../Main"

const Text = styled.Text(({ theme }) => ({
    color: theme.main.color,
}))

const Title = styled(Text)({
    fontSize: 20,
})

const Cart = memo(() => {
    const { items, removeItem } = useContext(AppContext)
    const navigation = useNavigation()

    const renderItems = (item, index) => {
        return (
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    padding: 10,
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("ProductDetails", { ...item })
                    }}
                    style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Image
                        source={{ uri: item.image }}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 50,
                            resizeMode: "contain",
                        }}
                    />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 17 }}>{item.name}</Text>
                        <Text>Description</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        removeItem(index)
                    }}>
                    <Text>Remove</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View>
            {!items.length && <Title>Cart is empty</Title>}
            {items && items.map(renderItems)}
        </View>
    )
})

export default withScreen({ cart: false })(Cart)
