import React, { memo, useCallback, useContext, useState } from "react"
import { View, ToastAndroid, Platform } from "react-native"
import styled from "@emotion/native"

import withScreen from "../../utils/hoc/createScreen"
import { Text } from "../components"
import { normalize } from "../../utils/scale"
import { toCurrency } from "../../utils/formatter"
import { calculateSubtotal, calculateGrandTotal, getSelectedAttributesOption } from "./Sales/utils"
import { methods } from "./Sales/methods"
import { AppContext } from "../Main"
import { PRODUCT_TYPES } from "./Product/constants"
import { ScrollView } from "react-native"
import IconType from "../components/Button/IconType"
import Device from "./BluetoothSettings/Printer"
import { CancelButton } from "./Product/Forms/Toolbar"

const RowTitle = styled(Text)({
    fontWeight: "bold",
    width: "25%",
    flexGrow: 1,
    paddingBottom: normalize(10),
})

const TableRow = styled(View)({
    width: "25%",
    flexGrow: 1,
})

const ButtonToolbar = styled(View)(({ theme }) => ({
    height: theme.button.height,
}))

const CheckoutScreen = memo(({ route, navigation }) => {
    const params = route.params
    const { appState, clearCartItems } = useContext(AppContext)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(false)

    const onSubmit = useCallback(async () => {
        const Printer = new Device()
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
            if (result.ok) {
                const response = result.data
                if (response.error) {
                    if (Platform.OS === "android") {
                        ToastAndroid.show(response.error, ToastAndroid.TOP)
                    }
                    setIsSubmitting(false)
                    setError(response.error)
                } else {
                    clearCartItems({
                        onSuccess: async () => {
                            if (appState.device.status) {
                                console.log("PRINT")
                                try {
                                    const result = await Printer.send({
                                        name: "Test",
                                        data: items,
                                    })

                                    setError(false)
                                    setIsSubmitting(false)

                                    if (result.success) {
                                        if (Platform.OS === "android") {
                                            ToastAndroid.show("Success", ToastAndroid.TOP)
                                            navigation.goBack()
                                        }
                                    }
                                } catch (err) {
                                    try {
                                        let error = JSON.parse(JSON.stringify(err)).message
                                        setError(error)
                                    } catch (error) {
                                        setError("Error")
                                    }
                                    setIsSubmitting(false)
                                }
                            } else {
                                setError(false)
                                setIsSubmitting(false)
                                if (Platform.OS === "android") {
                                    ToastAndroid.show("Success", ToastAndroid.TOP)
                                    navigation.goBack()
                                }
                            }
                        },
                    })
                }
            }
        } catch (err) {
            console.log("TRANSACTION", err)
        }
    }, [params, navigation])

    const onCancel = () => {
        navigation.goBack()
    }

    const renderAddons = (add_ons) => {
        if (add_ons && add_ons.length) {
            const data = add_ons.filter((item) => +item.quantity > 0)

            if (data.length === 0) return null

            return (
                <View>
                    {data.map((value, index) => {
                        return (
                            <Text style={{ marginTop: normalize(2) }} key={index}>
                                {value.name} - {toCurrency(value.price)} ({value.quantity}x)
                            </Text>
                        )
                    })}
                </View>
            )
        }

        return
    }

    const renderItems = (item, index) => {
        let attributes, product

        if (item.attributes) {
            attributes = getSelectedAttributesOption(item.attributes, {
                attributes: item.product.attributes,
            })
        }

        if (item[item.type]) {
            product = item[item.type]
        }

        return (
            <View
                key={`index-${index}`}
                style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: normalize(10),
                    paddingBottom: normalize(10),
                    borderBottomWidth: params.items.length - 1 === index ? 0 : 1,
                    borderBottomColor: "#CCC",
                }}>
                <TableRow>
                    <Text>{item.name}</Text>
                    {product && (
                        <View style={{ marginBottom: normalize(5) }}>
                            {item.type === PRODUCT_TYPES.SIMPLE && <Text>Price - {toCurrency(product.price)}</Text>}
                            {item.type === PRODUCT_TYPES.VARIATION && (
                                <Text>
                                    {product.name} - {toCurrency(product.price)}
                                </Text>
                            )}
                        </View>
                    )}
                    {item.type === PRODUCT_TYPES.VARIATION && attributes.length && (
                        <View>
                            <Text style={{ fontWeight: "bold", marginTop: normalize(5), marginBottom: normalize(5) }}>
                                Attributes
                            </Text>
                            {attributes.map((item, index) => {
                                return (
                                    <View key={`attribute-${index}`}>
                                        <Text>
                                            {item.name}: {item.selected_option.name}
                                        </Text>
                                    </View>
                                )
                            })}
                        </View>
                    )}
                </TableRow>
                <TableRow>
                    <Text>{item.quantity}</Text>
                </TableRow>
                <TableRow>{renderAddons(item.add_ons)}</TableRow>
                <TableRow>
                    <Text>{toCurrency(calculateSubtotal(item))}</Text>
                </TableRow>
            </View>
        )
    }

    return (
        <View style={{ height: "100%", flex: 1, padding: normalize(20), paddingTop: 0 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: normalize(10) }}>
                <Text style={{ fontSize: normalize(16), fontWeight: "bold" }}>Review Cart Items</Text>
                <View style={{ alignItems: "flex-end" }}>
                    <Text style={{ fontSize: normalize(10) }}>
                        Printer: {appState.device.status ? `Connected (${appState.device.name})` : `Disconnected`}
                    </Text>
                </View>
            </View>
            {error && (
                <View style={{ marginBottom: normalize(10) }}>
                    <Text style={{ color: "red" }}>{error}</Text>
                </View>
            )}
            <View style={{ flexGrow: 1, flex: 1 }}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: normalize(5),
                        borderBottomWidth: 1,
                    }}>
                    <RowTitle>Name</RowTitle>
                    <RowTitle>Quantity</RowTitle>
                    <RowTitle>Add ons</RowTitle>
                    <RowTitle>Subtotal</RowTitle>
                </View>
                <View style={{ flexGrow: 1, marginBottom: 10, marginTop: 10, flex: 1 }}>
                    <ScrollView style={{ flex: 1, height: "100%" }}>
                        <View>{params && params.items && params.items.map(renderItems)}</View>
                    </ScrollView>
                </View>
            </View>

            <ButtonToolbar style={{ justifyContent: "flex-start" }}>
                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                    <CancelButton />
                    <View style={{ width: 10 }}></View>
                    <IconType
                        disabled={isSubmitting}
                        loading={isSubmitting}
                        total={calculateGrandTotal(params.items)}
                        onPress={onSubmit}
                        title={isSubmitting ? "Please wait" : "Submit"}
                    />
                </View>
            </ButtonToolbar>
        </View>
    )
})

export default withScreen({ cart: false, back: false })(CheckoutScreen)
