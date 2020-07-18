import React, { memo, useMemo, useContext } from "react"
import { View, TouchableOpacity, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { formatCurrency } from "../../utils/formatter"
import { Text } from "../components"
import { AppContext } from "../Main"
import { normalize } from "../../utils/scale"

const Cart = memo(() => {
    const { items, removeItem } = useContext(AppContext)
    const navigation = useNavigation()

    const getTotalAddOn = (values) => {
        return values.reduce((sum, item) => {
            const curr = +item.quantity * parseFloat(item.price).toFixed(2)
            let total = sum + curr

            return total
        }, 0)
    }

    const renderAddOns = (add_ons) => {
        if (add_ons && add_ons.length) {
            const data = add_ons.filter((item) => +item.quantity > 0)

            if (data.length === 0) {
                return null
            }

            return (
                <View style={{ marginTop: normalize(5) }}>
                    <Text style={{ fontWeight: "bold", marginTop: normalize(5) }}>Addons</Text>
                    {data.map((value, index) => {
                        return (
                            <Text style={{ marginTop: normalize(2) }} key={index}>
                                {value.name} - {formatCurrency(value.price)} ({value.quantity}x)
                            </Text>
                        )
                    })}
                </View>
            )
        }

        return
    }

    const renderItems = (item, index) => {
        return (
            <View
                key={`item-${index}`}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: normalize(20),
                }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("ProductDetails", { ...item, edit: true, index })
                    }}
                    style={{ alignItems: "flex-start" }}>
                    <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                        <View style={{ marginLeft: normalize(0) }}>
                            <Text style={{ fontWeight: "bold", fontSize: normalize(15), marginBottom: normalize(5) }}>
                                {item.name}
                            </Text>
                            <Text>
                                {item.variation ? `${item.variation.name} - ` : ""}
                                {formatCurrency(item.price)} ({item.quantity}x)
                            </Text>
                            {renderAddOns(item.add_ons)}
                        </View>
                    </View>
                </TouchableOpacity>
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
            let value = total + subtotal

            if (item.add_ons && item.add_ons.length) {
                const add_ons_total = getTotalAddOn(item.add_ons)
                value += add_ons_total
            }

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
                            paddingTop: normalize(10),
                            paddingBottom: normalize(10),
                        }}>
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>Total</Text>
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>{calculateTotal(items)}</Text>
                    </View>
                </View>
            </View>
        )
    }, [items])
})

export default Cart
