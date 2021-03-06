import React, { memo, useMemo, useContext, useCallback } from "react"
import { View, TouchableOpacity, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Icon } from "react-native-elements"

import { formatCurrency } from "../../../utils/formatter"
import { Text } from "../../components"
import { AppContext } from "../../Main"
import { normalize } from "../../../utils/scale"
import { methods } from "./methods"
import { calculateSubtotal, calculateGrandTotal } from "./utils"
import { PRODUCT_TYPES } from "../Product/constants"
import IconType from "../../components/Button/IconType"
import AppIcon from "../../components/Icon"

const Cart = memo(() => {
    const { items, removeItem, clearCartItems } = useContext(AppContext)
    const navigation = useNavigation()

    const onSubmit = useCallback(async () => {
        navigation.navigate("CheckoutPage", { items })
    }, [items])

    const renderItems = (item, index) => {
        return (
            <View
                key={`item-${index}`}
                style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginBottom: normalize(20),
                    flex: 1,
                    height: "100%",
                }}>
                <TouchableOpacity
                    onPress={() => removeItem(index)}
                    style={{
                        width: "10%",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        height: "100%",
                    }}>
                    <AppIcon name="x-circle" type="feather" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ flexGrow: 1 }}
                    onPress={() => {
                        navigation.navigate("ProductDetails", { ...item, edit: true, index })
                    }}>
                    <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                        <View style={{ marginLeft: normalize(0) }}>
                            <Text style={{ fontWeight: "bold", fontSize: normalize(14), marginBottom: normalize(2) }}>
                                {item.name}
                            </Text>
                            <Text>
                                {item.type === PRODUCT_TYPES.VARIATION ? `${item.variation.name} - ` : ""}
                                {formatCurrency(item[item.type].price)} ({item.quantity}x)
                            </Text>
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
        const label = items.length > 1 ? "Items" : "Item"
        return (
            <View style={{ flex: 1 }}>
                {/* <Text style={{ textAlign: "right", fontWeight: "bold", fontSize: 20 }}>Cart Items</Text> */}
                <View style={{ flexGrow: 1, marginBottom: 10, marginTop: 10, flex: 1 }}>
                    <ScrollView style={{ height: "100%", flex: 1 }}>
                        {!items.length && <Text>Cart is empty</Text>}
                        <View>{items && items.map(renderItems)}</View>
                    </ScrollView>
                </View>
                <View style={{ height: normalize(60) }}>
                    {items && items.length > 0 && (
                        <IconType
                            onPress={onSubmit}
                            title={`${items.length} ${label}`}
                            total={calculateGrandTotal(items)}
                        />
                    )}
                </View>
            </View>
        )
    }, [items])
})

export default Cart
