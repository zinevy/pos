import React, { memo, Suspense } from "react"
import { ScrollView, View } from "react-native"

import { Text } from "../../components"
import Items from "./Items"
import Cart from "../Cart"
import { normalize } from "../../../utils/scale"
// import Items from "./Items"

const SalesItems = memo(() => {
    return (
        <View style={{ flexDirection: "row", height: "95%" }}>
            <ScrollView style={{ width: "60%", height: "100%" }}>
                <Suspense
                    fallback={
                        <View>
                            <Text>loading...</Text>
                        </View>
                    }>
                    <Items />
                </Suspense>
            </ScrollView>
            <View style={{ paddingRight: normalize(10), width: "40%" }}>
                <View>
                    <Text
                        style={{
                            fontSize: normalize(20),
                            marginBottom: normalize(20),
                            fontWeight: "bold",
                            textAlign: "center",
                        }}>
                        Checkout
                    </Text>
                </View>
                <Cart />
            </View>
        </View>
    )
})

export default SalesItems
