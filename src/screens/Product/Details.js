import React, { useContext, memo } from "react"
import { View } from "react-native"
import { WebView } from "react-native-webview"
import useSWR from "swr"

import withScreen from "../../../utils/hoc/createScreen"
import { AppContext } from "../../Main"

import { Text, LazyImage, Button } from "../../components"
import { normalizeHeight } from "../../../utils/scale"
import { methods } from "../Sales/methods"

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
    const { addToCart } = useContext(AppContext)
    const { data, error } = useSWR([item.id], fetchProduct)

    if (error) {
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
        <View style={{ margin: 20 }}>
            <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 20 }}>{item.name}</Text>
            </View>
            <View style={{ marginBottom: 20 }}>
                <LazyImage
                    style={{
                        width: "100%",
                        height: normalizeHeight(200),
                        borderRadius: 10,
                    }}
                    source={{ uri: item.image }}
                />
            </View>
            <View>
                <Text>{item.description}</Text>
            </View>
            <Button
                title="Add to cart"
                onPress={() => {
                    item.quantity = 1
                    addToCart(item)
                    navigation.goBack()
                }}
            />
        </View>
    )
})

export default withScreen()(Product)
