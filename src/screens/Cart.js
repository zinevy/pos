import React, { memo, useMemo, useContext } from "react"
import { View, TouchableOpacity, ScrollView } from "react-native"

import { formatCurrency } from "../../utils/formatter"
import { Text } from "../components"
import { AppContext } from "../Main"
import { normalize } from "../../utils/scale"

const Cart = memo(() => {
    const { items, removeItem } = useContext(AppContext)

    console.log("CART_ITEMS", items)

    const renderItems = (item, index) => {
        return (
            <View
                key={`item-${index}`}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: normalize(10),
                }}>
                <View style={{ alignItems: "flex-start" }}>
                    <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                        <View style={{ marginLeft: normalize(0) }}>
                            <Text style={{ fontWeight: "bold", fontSize: normalize(15), marginBottom: normalize(5) }}>
                                {item.name}
                            </Text>
                            <Text>
                                {formatCurrency(item.price)} ({item.quantity}x)
                            </Text>
                        </View>
                    </View>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => {
                            removeItem(index)
                        }}>
                        <Text>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const calculateTotal = (items) => {
        const total = items.reduce((total, item) => {
            const subtotal = +item.quantity * parseFloat(item.price).toFixed(2)
            const value = total + subtotal

            return value
        }, 0)

        return formatCurrency(total)
    }

    return useMemo(() => {
        return (
            <View style={{ height: "90%" }}>
                <ScrollView style={{ height: "90%" }}>
                    {!items.length && <Text>Cart is empty</Text>}
                    <View style={{ marginBottom: normalize(100) }}>{items && items.map(renderItems)}</View>
                </ScrollView>
                <View style={{ width: "100%", flexGrow: 1 }}>
                    <View
                        style={{
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

export default Cart
