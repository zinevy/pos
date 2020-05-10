import React, { memo, useMemo, useContext, useCallback, useState, useEffect } from "react"
import { View, TouchableOpacity, ScrollView, Dimensions } from "react-native"

import { formatCurrency } from "../../utils/formatter"
import { Text, LazyImage } from "../components"
import { AppContext } from "../Main"

const Cart = memo(({ navigation }) => {
    const { items, removeItem } = useContext(AppContext)

    const renderItems = (item, index) => {
        return (
            <View
                key={`item-${index}`}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 10,
                }}>
                <View style={{ width: "60%", alignItems: "flex-start" }}>
                    <TouchableOpacity
                        style={{ flexDirection: "row", alignItems: "flex-start" }}
                        onPress={() => {
                            navigation.navigate("ProductDetails", { ...item })
                        }}>
                        <LazyImage
                            source={{ uri: item.image }}
                            style={{
                                width: 70,
                                height: 70,
                                borderRadius: 10,
                                resizeMode: "cover",
                            }}
                        />
                        <View style={{ marginLeft: 10 }}>
                            <Text lines={2} style={{ fontWeight: "bold", fontSize: 15, marginBottom: 5 }}>
                                {item.name}
                            </Text>
                            <Text>
                                {formatCurrency(item.price)} ({item.quantity}x)
                            </Text>
                        </View>
                    </TouchableOpacity>
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
        const total = items.reduce((total, item) => +total + +item.price, 0)

        return formatCurrency(total)
    }

    return useMemo(() => {
        return (
            <View style={{ flex: 1, margin: 20 }}>
                <ScrollView>
                    {!items.length && <Text>Cart is empty</Text>}
                    <View style={{ marginBottom: 200 }}>{items && items.map(renderItems)}</View>
                </ScrollView>
                <View style={{ bottom: 0, width: "100%", position: "absolute" }}>
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

export default Cart
