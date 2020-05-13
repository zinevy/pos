import React, { memo, useState, useEffect } from "react"
import { FlatList, View } from "react-native"
import { usePaginatedQuery, queryCache, useInfiniteQuery } from "react-query"

import { requests } from "../../../utils/httpClient"

import Item from "./Item"
import { Button, Text } from "../../components"

const fetchProducts = async (key, page = 1) => {
    console.log("page", page)
    const response = await requests.fetchSampleProducts(page)
    const jsonResponse = await response.json()

    if (response.ok) {
        const products = jsonResponse

        const items = products.map((item) => ({
            id: item.id,
            name: item.name,
            image: item.images[0].src,
            price: item.price,
        }))

        return {
            products: items,
            page,
        }
    }

    return {}
}

const Items = memo(() => {
    const [page, setPage] = useState(1)
    // const { data, error } = useSWR(1, fetchProducts, { suspense: true })

    // const { status, resolvedData, latestData, error, isFetching } = usePaginatedQuery(["page", page], fetchProducts, {})

    const { status, data, error, isFetching, isFetchingMore, fetchMore, canFetchMore } = useInfiniteQuery(
        "projects",
        fetchProducts,
        {
            getFetchMore: (next) => {
                return next.page + 1
            },
        }
    )

    if (status === "loading") {
        return (
            <View>
                <Text>loading...</Text>
            </View>
        )
    }

    // return <Text>2</Text>

    return (
        <View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {data.map((page, i) => (
                    <React.Fragment key={i}>
                        {page.products.map((product, index) => (
                            <Item item={product} key={index} />
                        ))}
                    </React.Fragment>
                ))}
            </View>
            <Button
                disabled={!canFetchMore || isFetchingMore}
                title={isFetchingMore ? "Loading more..." : canFetchMore ? "Load More" : "Nothing more to load"}
                onPress={() => {
                    // setPage((page) => page + 1)
                    fetchMore()
                }}
            />
        </View>
    )

    // return (
    //     <View>
    //         <FlatList
    //             data={resolvedData.products}
    //             keyExtractor={(user) => user.id.toString()}
    //             horizontal
    //             bounces={false}
    //             showsHorizontalScrollIndicator={false}
    //             onEndReachedThreshold={0.5}
    //             onEndReached={({ distanceFromEnd }) => {
    //                 // problem
    //                 console.log(distanceFromEnd) // 607, 878
    //                 console.log("reached") // once, and if I scroll about 14% of the screen,
    //                 // setPage((old) => (!latestData || !latestData.hasMore ? old : old + 1))
    //             }}
    //             style={{
    //                 flexDirection: "row",
    //                 overscrollBehaviorY: "auto",
    //                 touchAction: "auto",
    //                 width: "100%",
    //             }}
    //             renderItem={({ item }) => <Item item={item} />}
    //         />
    //         <Button
    //             title="load more"
    //             onPress={() => {
    //                 setPage((old) => old + 1)
    //             }}
    //             // disabled={!latestData || !latestData.hasMore}
    //         />
    //         <Text>{isFetching && "loading..."}</Text>
    //     </View>
    // )
})

export default Items
