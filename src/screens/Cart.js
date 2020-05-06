import React, { memo, useMemo } from "react"
import { View, TouchableOpacity, Image, ScrollView } from "react-native"
import styled from "@emotion/native"

import withScreen from "../../utils/hoc/createScreen"
import { formatCurrency } from "../../utils/formatter"
import withAppContext from "../../utils/hoc/withAppContext"

const Text = styled.Text(({ theme }) => ({
    color: theme.main.color,
}))

const Title = styled(Text)({
    fontSize: 20,
})

const Cart = memo(({ items, removeItem, navigation }) => {
    const renderItems = (item, index) => {
        return (
            <View
                key={`item-${index}`}
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
                        <Text>
                            Description | {formatCurrency(item.price)} | {item.quantity}x
                        </Text>
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

    const calculateTotal = (items) => {
        const total = items.reduce((total, item) => total + item.price, 0)

        return formatCurrency(total)
    }

    return useMemo(() => {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    {!items.length && <Title>Cart is empty</Title>}
                    <View style={{ marginBottom: 100 }}>{items && items.map(renderItems)}</View>
                </ScrollView>
                <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
                    <View
                        style={{
                            margin: 5,
                            backgroundColor: "rgba(255,255,255,0.9)",
                            padding: 20,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            borderRadius: 10,
                        }}>
                        <Text style={{ color: "#000" }}>Total</Text>
                        <Text style={{ color: "#000" }}>{calculateTotal(items)}</Text>
                    </View>
                </View>
            </View>
        )
    }, [items])
})

const mapContext = ({ items, removeItem }) => ({
    items,
    removeItem,
})

const withScreenCart = withScreen({ cart: false })(Cart)

export default withAppContext(mapContext)(withScreenCart)
