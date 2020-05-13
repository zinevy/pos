import React, { memo, useMemo, useContext, useCallback, useState, useEffect } from "react"
import { View, TouchableOpacity, ScrollView, Dimensions } from "react-native"

import { formatCurrency } from "../../utils/formatter"
import { Text, LazyImage } from "../components"
import { AppContext } from "../Main"
import { normalize, normalizeHeight } from "../../utils/scale"

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
                    marginBottom: normalize(10),
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
                                width: normalize(50),
                                height: normalize(50),
                                borderRadius: normalize(10),
                                resizeMode: "cover",
                            }}
                        />
                        <View style={{ marginLeft: normalize(10) }}>
                            <Text style={{ fontWeight: "bold", fontSize: normalize(15), marginBottom: normalize(5) }}>
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
            <View style={{ flex: 1, margin: normalize(20) }}>
                <ScrollView>
                    {!items.length && <Text>Cart is empty</Text>}
                    <View style={{ marginBottom: normalize(100) }}>{items && items.map(renderItems)}</View>
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
