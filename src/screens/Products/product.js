import React, { useContext, memo } from "react"
import { View } from "react-native"
import { WebView } from "react-native-webview"

import withScreen from "../../../utils/hoc/createScreen"
import { AppContext } from "../../Main"

import { Text, LazyImage, Button } from "../../components"
import { normalizeHeight } from "../../../utils/scale"

const Product = memo(({ route }) => {
    const item = route.params
    const { addToCart } = useContext(AppContext)

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
                        resizeMode: "cover",
                    }}
                    source={{ uri: item.image }}
                />
            </View>
            <View>
                <WebView originWhitelist={["*"]} source={{ html: item.description }} />
                {/* <Text>{item.description}</Text> */}
            </View>
            <Button
                title="Add to cart"
                onPress={() => {
                    item.quantity = 1
                    addToCart(item)
                }}
            />
        </View>
    )
})

export default withScreen()(Product)
