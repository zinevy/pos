import React, { memo } from "react"
import useSWR, { useSWRPages } from "swr"
import { View } from "react-native"

import { methods } from "./methods"
import Item from "./Item"
import { normalize } from "../../../utils/scale"

const fetchProducts = async (page) => {
    const response = await methods.get({ per_page: 5 })

    const jsonResponse = response.data

    if (response.ok) {
        const products = jsonResponse.data

        const items = products.map((item) => ({
            id: item.id,
            name: item.name,
            image: item.image,
            price: item.price,
        }))

        return {
            products: items,
            meta: jsonResponse.meta,
        }
    }

    return {}
}

const Items = memo(() => {
    const { pages, isLoadingMore, loadMore } = useSWRPages(
        "items",
        ({ offset, withSWR }) => {
            const response = withSWR(useSWR(offset || 1, fetchProducts, { revalidateOnFocus: false, suspense: true }))

            if (!response) return null

            if (response.data && response.data.products) {
                return response.data.products.map((item) => {
                    return <Item key={item.id} item={item} />
                })
            }

            return null
        },
        (SWR, index) => {
            if (SWR.data && SWR.data.length === 0) return null

            return index + 2
        },
        []
    )

    return (
        <View
            style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginBottom: normalize(50),
                marginLeft: normalize(10),
                marginRight: normalize(10),
            }}>
            {pages}
        </View>
    )
})

export default Items
