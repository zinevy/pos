import React, { memo } from "react"
import { View } from "react-native"
import useSWR from "swr"

import withScreen from "../../../utils/hoc/createScreen"
import { Text } from "../../components"
import { methods } from "../Sales/methods"
import SimpleProduct from "./Forms/SimpleProduct"
import EditSimpleProduct from "./Forms/EditSimpleProduct"
import VariableProduct from "./Forms/VariableProduct"
import EditVariableProduct from "./Forms/EditVariableProduct"
import { PRODUCT_TYPES } from "./constants"
import Preloader from "../Sales/Preloader"

const fetchProduct = async (id) => {
    const response = await methods.getProduct({ id })
    const jsonResponse = response.data

    if (response.ok) {
        const item = jsonResponse.data

        return item
    }

    return {}
}

const fetchAddons = async () => {
    const response = await methods.getAddOns()
    const jsonResponse = response.data

    if (response.ok) {
        const item = jsonResponse.data

        return item
    }

    return {}
}

const Product = memo(({ route, navigation }) => {
    const item = route.params
    const { data: product, error: productError } = useSWR([item.id], fetchProduct, {
        shouldRetryOnError: true,
    })

    const { data: addons, error: addonsError } = useSWR("addons", fetchAddons, {
        shouldRetryOnError: true,
    })

    if (productError || addonsError) {
        return (
            <View>
                <Text>Error</Text>
            </View>
        )
    }

    if (!product || !addons) {
        return <Preloader />
    }

    const renderSimpleProductForm = () => {
        const formProps = {
            addons,
            navigation,
            data: product,
            params: item,
        }
        if (item.edit) {
            return <EditSimpleProduct {...formProps} />
        } else {
            return <SimpleProduct {...formProps} />
        }
    }

    const renderVariableProductForm = () => {
        const formProps = {
            addons,
            navigation,
            data: product,
            params: item,
        }

        if (item.edit) {
            return <EditVariableProduct {...formProps} />
        } else {
            return <VariableProduct {...formProps} />
        }
    }

    return (
        <View style={{ flex: 1 }}>
            {product.type === PRODUCT_TYPES.SIMPLE && renderSimpleProductForm()}
            {product.type === PRODUCT_TYPES.VARIABLE && renderVariableProductForm()}
        </View>
    )
})

export default withScreen({ back: false })(Product)
