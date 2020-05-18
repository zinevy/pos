import React, { useState } from "react"
import useSWR, { useSWRPages } from "swr"
import { View, FlatList } from "react-native"

import { Button, Text } from "../../components"
import { requests } from "../../../utils/httpClient"
import { Fragment } from "react"

import { useEffect } from "react"
import { useMemo } from "react"
import ProductList from "./List"

const fetchProducts = async (page) => {
    const response = await requests.fetchSampleProducts(page)
    const jsonResponse = await response.json()

    if (response.ok) {
        const products = jsonResponse.result

        const items = products.map((item) => ({
            id: item.id,
            name: item.title,
            image: item.thumbnail,
            price: item.album_id,
        }))

        return {
            products: items,
            page: +page,
        }
    }

    return {}
}

function Items() {
    const [items, setItems] = useState()
    const { pages, pageSWRs, isLoadingMore, loadMore } = useSWRPages(
        "items",
        ({ offset, withSWR }) => {
            const response = withSWR(useSWR(offset || 1, fetchProducts, { revalidateOnFocus: false }))

            return <Fragment />
        },
        (SWR, index) => {
            if (SWR.data && SWR.data.length === 0) return null

            return index + 2
        },
        []
    )

    useEffect(() => {
        const pagedProducts = pageSWRs.map((swr) => swr.data)

        if (pagedProducts[pagedProducts.length - 1]) {
            setItems(pagedProducts)
        }
    }, [pageSWRs])

    return useMemo(
        () => (
            <View>
                {pages}
                {items && <ProductList items={items} />}
                {isLoadingMore && <View style={{ alignItems: "center" }}>{<Text>Loading...</Text>}</View>}
                {!isLoadingMore && (
                    <Button
                        title={isLoadingMore ? "Loading more" : "Load more"}
                        disabled={isLoadingMore}
                        isLoadingMore={isLoadingMore}
                        onPress={() => loadMore()}
                    />
                )}
            </View>
        ),
        [items, isLoadingMore]
    )
}

export default Items
