import React, { memo, useCallback, useRef, useMemo } from "react"
import { useSWRInfinite } from "swr"
import { View, RefreshControl, FlatList } from "react-native"
import qs from "qs-stringify"

import { methods } from "./methods"
import Item from "./Item"
import { normalize } from "../../../utils/scale"
import { Text } from "../../components"
import ListGridPreloader from "../Products/Preloader"
import { useFocusEffect } from "@react-navigation/native"

const PAGE_SIZE = 9

const fetchProducts = async (url) => {
    const config = {
        sort: "name",
        sort_type: "asc",
    }

    const response = await methods.getProducts(url + `&${qs(config)}`)

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
}

const Header = ({ isRefreshing }) => {
    if (isRefreshing) {
        return (
            <View style={{ alignItems: "center", padding: 20, width: "100%" }}>
                <Text>Refreshing...</Text>
            </View>
        )
    }

    return null
}

const Footer = ({ isReachingEnd, isLoadingMore }) => {
    if (isLoadingMore) {
        return (
            <View style={{ alignItems: "center", padding: 20, width: "100%" }}>
                <Text>Please wait...</Text>
            </View>
        )
    }

    if (isReachingEnd) {
        return (
            <View style={{ alignItems: "center", padding: 20, width: "100%" }}>
                <Text>End</Text>
            </View>
        )
    }

    return null
}

const Items = () => {
    const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
        (pageIndex) => `/products?page=${pageIndex + 1}`,
        fetchProducts
    )
    const onEndReachedCalledDuringMomentumRef = useRef(true)

    const isLoadingInitialData = !data && !error
    const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === "undefined")
    const isEmpty = data?.[0]?.length === 0
    const isReachingEnd = isEmpty || (data && data[data.length - 1]?.products.length < PAGE_SIZE)

    const isRefreshing = isValidating && data && data.length === size
    const items = useMemo(() => data && [].concat(...data.map((page) => page.products)), [data])

    const renderItem = ({ item }) => {
        return <Item key={item.id} item={item} />
    }

    const handleLoadMore = useCallback(() => {
        if (!onEndReachedCalledDuringMomentumRef.current && !isReachingEnd) {
            setSize(size + 1)
            onEndReachedCalledDuringMomentumRef.current = true
        }
    }, [size, isReachingEnd])

    if (isLoadingInitialData) {
        return <ListGridPreloader items={9} />
    }

    return (
        <View
            style={{
                marginBottom: normalize(50),
                marginLeft: normalize(10),
                marginRight: normalize(10),
                height: "100%",
            }}>
            <FlatList
                data={items}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.1}
                ListHeaderComponent={<Header isRefreshing={isRefreshing} />}
                ListFooterComponent={<Footer isReachingEnd={isReachingEnd} isLoadingMore={isLoadingMore} />}
                onMomentumScrollBegin={() => {
                    onEndReachedCalledDuringMomentumRef.current = false
                }}
                numColumns={3}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={mutate} />}
            />
        </View>
    )
}

export default Items
