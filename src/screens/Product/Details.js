import React, { useContext, memo, useState, useEffect } from "react"
import { View } from "react-native"
import useSWR from "swr"
import { Formik } from "formik"
import { object, string } from "yup"

import withScreen from "../../../utils/hoc/createScreen"
import { AppContext } from "../../Main"

import { Text } from "../../components"
import { methods } from "../Sales/methods"
import SimpleProduct from "./Forms/SimpleProduct"
import VariableProduct from "./Forms/VariableProduct"

// const validationSchema = object().shape({
//     variations: string().label("Variations").required(),
//     addons: string().label("Addons").required(),
// })

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
            <Text>Form</Text>
            {data.type === "simple" && <SimpleProduct data={data} />}
            {data.type === "variable" && <VariableProduct data={data} />}
        </View>
    )
})

export default withScreen()(Product)
