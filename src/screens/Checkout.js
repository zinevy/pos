import React, { memo, useCallback, useContext, useState, useRef } from "react"
import { View } from "react-native"
import styled from "@emotion/native"
import Toast, { DURATION } from "react-native-easy-toast"

import withScreen from "../../utils/hoc/createScreen"
import { Text, Button } from "../components"
import { normalize } from "../../utils/scale"
import { formatCurrency } from "../../utils/formatter"
import { calculateSubtotal, calculateGrandTotal } from "./Sales/utils"
import { methods } from "./Sales/methods"
import { AppContext } from "../Main"

const RowTitle = styled(Text)({
    fontWeight: "bold",
    width: "16.67%",
    flexGrow: 1,
    paddingTop: normalize(10),
    paddingBottom: normalize(10),
})

const TableRow = styled(View)({
    width: "16.67%",
    flexGrow: 1,
})

const CheckoutScreen = memo(({ route, navigation }) => {
    const params = route.params
    const { clearCartItems } = useContext(AppContext)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(false)

    const onSubmit = useCallback(async () => {
        const items = params.items
        let sales = {
            name: "Sale",
            description: "Sale",
            type: "Sale",
            products: items.map((item) => ({
                quantity: item.quantity,
                type: item.type,
                product_id: item.product_id,
                add_ons: item.add_ons,
            })),
        }
        setIsSubmitting(true)
        setError(false)

        try {
            const result = await methods.submit(sales)
            console.log("RESULT", result)
            if (result.ok) {
                const response = result.data
                if (response.error) {
                    setIsSubmitting(false)
                    setError(response.error)
                } else {
                    clearCartItems({
                        onSuccess: () => {
                            setError(false)
                            setIsSubmitting(false)
                            console.log("CLEARED")
                            navigation.goBack()
                        },
                    })
                }
            }
        } catch (err) {}
    }, [params, navigation])

    const renderAddons = (add_ons) => {
        if (add_ons && add_ons.length) {
            const data = add_ons.filter((item) => +item.quantity > 0)

            if (data.length === 0) return null

            return (
                <View>
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
                key={`index-${index}`}
                style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: normalize(20),
                }}>
                <TableRow>
                    <Text>{item.name}</Text>
                </TableRow>
                <TableRow>
                    <Text>{item.quantity}</Text>
                </TableRow>
                <TableRow>{renderAddons(item.add_ons)}</TableRow>
                <TableRow>
                    <Text>40%</Text>
                </TableRow>
                <TableRow>
                    <Text>40%</Text>
                </TableRow>
                <TableRow>
                    <Text>{calculateSubtotal(item)}</Text>
                </TableRow>
            </View>
        )
    }

    console.log("isSubmitting", isSubmitting)

    return (
        <View style={{ margin: normalize(20) }}>
            <Text style={{ fontSize: normalize(20), fontWeight: "bold", marginBottom: normalize(30) }}>
                Review Cart Items
            </Text>
            {error && (
                <View style={{ marginBottom: normalize(30) }}>
                    <Text style={{ color: "red" }}>{error}</Text>
                </View>
            )}
            <View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: normalize(20),
                        borderBottomWidth: 1,
                    }}>
                    <RowTitle>Name</RowTitle>
                    <RowTitle>Quantity</RowTitle>
                    <RowTitle>Add ons</RowTitle>
                    <RowTitle>Sugar Level</RowTitle>
                    <RowTitle>Ice Level</RowTitle>
                    <RowTitle>Subtotal</RowTitle>
                </View>
                <View style={{ flexDirection: "column", justifyContent: "space-between" }}>
                    {params && params.items && params.items.map(renderItems)}
                </View>
            </View>
            <View style={{ borderTopWidth: 1, paddingTop: normalize(20), paddingBottom: normalize(20) }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ fontWeight: "bold", fontSize: normalize(15) }}>Grand total</Text>
                    <Text style={{ fontWeight: "bold", fontSize: normalize(15) }}>
                        {calculateGrandTotal(params.items)}
                    </Text>
                </View>
            </View>
            <Button
                disabled={isSubmitting}
                loading={isSubmitting}
                onPress={onSubmit}
                title={isSubmitting ? "Please wait" : "Submit"}
            />
        </View>
    )
})

export default withScreen({ cart: false })(CheckoutScreen)
