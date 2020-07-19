import React, { memo, useMemo, useContext, useCallback } from "react"
import { View, TouchableOpacity, ScrollView, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { FontAwesome } from "@expo/vector-icons"

import { formatCurrency } from "../../../utils/formatter"
import { Text, Button } from "../../components"
import { AppContext } from "../../Main"
import { normalize } from "../../../utils/scale"
import { methods } from "./methods"
import { calculateSubtotal, getTotalAddOn, calculateGrandTotal } from "./utils"

const Cart = memo(() => {
    const { items, removeItem, clearCartItems } = useContext(AppContext)
    const navigation = useNavigation()

    const onCheckout = async (values) => {
        console.log("items", values)
        try {
            const result = await methods.submit(values)
            if (result.ok) {
                clearCartItems({
                    onSuccess: () => {
                        console.log("CLEARED")
                    },
                })
            }
            console.log("RESULT", result)
        } catch (err) {}
    }

    const onSubmit = useCallback(async () => {
        navigation.navigate("CheckoutPage", { items })
    }, [items])

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
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginBottom: normalize(20),
                }}>
                <View style={{ width: "10%", alignItems: "flex-start" }}>
                    <TouchableOpacity
                        onPress={() => {
                            removeItem(index)
                        }}>
                        <FontAwesome name="trash" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={{ flexGrow: 1 }}
                    onPress={() => {
                        navigation.navigate("ProductDetails", { ...item, edit: true, index })
                    }}>
                    <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                        <View style={{ marginLeft: normalize(0) }}>
                            <Text style={{ fontWeight: "bold", fontSize: normalize(15), marginBottom: normalize(5) }}>
                                {item.name}
                            </Text>
                            <Text>
                                {item.variation ? `${item.variation.name} - ` : ""}
                                {formatCurrency(item.price)} ({item.quantity}x)
                            </Text>
                            {/* {renderAddOns(item.add_ons)} */}
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{ alignItems: "flex-start", height: "100%" }}>
                    <Text>{calculateSubtotal(item)}</Text>
                </View>
            </View>
        )
    }

    return useMemo(() => {
        return (
            <View style={{ height: "100%" }}>
                <ScrollView style={{ height: "90%" }}>
                    {!items.length && <Text>Cart is empty</Text>}
                    <View>{items && items.map(renderItems)}</View>
                </ScrollView>
                <View style={{ width: "100%" }}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            borderRadius: 10,
                            paddingTop: normalize(10),
                            paddingBottom: normalize(10),
                        }}>
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>Total</Text>
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>{calculateGrandTotal(items)}</Text>
                    </View>
                </View>
                {items && items.length > 0 && (
                    <View>
                        <Button onPress={onSubmit} title="Checkout" />
                    </View>
                )}
            </View>
        )
    }, [items])
})

export default Cart
