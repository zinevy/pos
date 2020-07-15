import React, { memo, Suspense } from "react"
import { ScrollView, View } from "react-native"

import { Text } from "../../components"
import Items from "./Items"
import Cart from "../Cart"
import { normalize } from "../../../utils/scale"
// import Items from "./Items"

const SalesItems = memo(() => {
    return (
        <View style={{ flexDirection: "row", height: "100%" }}>
            <ScrollView style={{ width: "50%", height: "100%" }}>
                <Suspense
                    fallback={
                        <View>
                            <Text>loading...</Text>
                        </View>
                    }>
                    <Items />
                </Suspense>
            </ScrollView>
            <View style={{ flexGrow: 1, paddingRight: normalize(10) }}>
                <Cart />
            </View>
        </View>
    )
})

export default SalesItems
