import React, { memo, Suspense } from "react"
import { ScrollView, View } from "react-native"

import Items from "./Items"
import Cart from "./Cart"
import { normalize } from "../../../utils/scale"
import ListGridPreloader from "../Products/Preloader"

const SalesItems = memo(() => {
    return (
        <View
            style={{
                flexDirection: "row",
                overflow: "hidden",
                height: "100%",
            }}>
            <View style={{ width: "60%", height: "100%" }}>
                <Items />
            </View>
            <View style={{ flex: 1, flexDirection: "row", width: "40%", marginRight: normalize(20) }}>
                <View
                    style={{
                        width: "100%",
                        flex: 1,
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}>
                    <View style={{ height: "100%" }}>
                        <Cart />
                    </View>
                </View>
            </View>
        </View>
    )
})

export default SalesItems
