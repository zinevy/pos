import React, { memo, Suspense } from "react"
import { ScrollView, View } from "react-native"

import { Text } from "../../components"
import Items from "./Items"
import Cart from "./Cart"
import { normalize } from "../../../utils/scale"
// import Items from "./Items"

const SalesItems = memo(() => {
    return (
        <View
            style={{
                flexDirection: "row",
                overflow: "hidden",
                height: "100%",
            }}>
            <View style={{ width: "60%", height: "100%" }}>
                <ScrollView>
                    <Suspense
                        fallback={
                            <View>
                                <Text>loading...</Text>
                            </View>
                        }>
                        <Items />
                    </Suspense>
                </ScrollView>
            </View>
            <View style={{ flex: 1, flexDirection: "row", width: "40%", marginRight: normalize(20) }}>
                <View
                    style={{
                        width: "100%",
                        flex: 1,
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}>
                    <View>
                        <Text
                            style={{
                                fontSize: normalize(20),
                                fontWeight: "bold",
                                textAlign: "center",
                            }}>
                            Cart
                        </Text>
                    </View>
                    <View style={{ height: "95%" }}>
                        <Cart />
                    </View>
                </View>
            </View>
        </View>
    )
})

export default SalesItems
