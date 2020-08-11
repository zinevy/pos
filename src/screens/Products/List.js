import React, { memo } from "react"
import { FlatList, View } from "react-native"

import Item from "./Item"
import { Fragment } from "react"

const ProductList = memo(({ items }) => {
    return (
        <FlatList
            data={items}
            keyExtractor={(item, index) => index.toString()}
            bounces={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
                if (item) {
                    return (
                        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                            {item.products.map((item, index) => (
                                <View key={index} style={{ width: "50%" }}>
                                    <Item item={item} />
                                </View>
                            ))}
                        </View>
                    )
                }

                return <Fragment />
            }}
        />
    )
})

export default ProductList
