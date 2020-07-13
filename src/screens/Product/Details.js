import React, { memo } from "react"
import { View } from "react-native"
import useSWR from "swr"

import withScreen from "../../../utils/hoc/createScreen"

import { Text } from "../../components"
import { methods } from "../Sales/methods"
import SimpleProduct from "./Forms/SimpleProduct"
import VariableProduct from "./Forms/VariableProduct"

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

const Product = memo(({ route }) => {
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

    console.log(data)

    return (
        <View>
            {data.type === PRODUCT_TYPES.SIMPLE && <SimpleProduct data={data} />}
            {data.type === PRODUCT_TYPES.VARIABLE && <VariableProduct data={data} />}
        </View>
    )
})

export default withScreen()(Product)
