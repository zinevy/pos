import React, { memo, useEffect, useState } from "react"
import { View } from "react-native"
import useSWR from "swr"

import withScreen from "../../../utils/hoc/createScreen"

import { Text } from "../../components"
import { methods } from "../Sales/methods"
import SimpleProduct from "./Forms/SimpleProduct"
import VariableProduct from "./Forms/VariableProduct"
import EditVariableProduct from "./Forms/EditVariableProduct"

import { PRODUCT_TYPES } from "./constants"

const fetchProduct = async (id) => {
    const response = await methods.getProduct({ id })
    const jsonResponse = response.data

    if (response.ok) {
        const item = jsonResponse.data

        return item
    }

    return {}
}

const Product = memo(({ route, navigation }) => {
    const item = route.params
    const { data, error: dataError } = useSWR([item.id], fetchProduct)

    if (dataError) {
        return (
            <View>
                <Text>Error</Text>
            </View>
        )
    }

    if (!data) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }

    return (
        <View>
            {data.type === PRODUCT_TYPES.SIMPLE && <SimpleProduct navigation={navigation} data={data} />}
            {data.type === PRODUCT_TYPES.VARIABLE && !item.edit && (
                <VariableProduct params={item} navigation={navigation} data={data} />
            )}
            {data.type === PRODUCT_TYPES.VARIABLE && item.edit && (
                <EditVariableProduct params={item} navigation={navigation} data={data} />
            )}
        </View>
    )
})

export default withScreen()(Product)
