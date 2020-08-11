import React, { memo, useCallback, useRef, useMemo } from "react"
import useSWR, { useSWRInfinite } from "swr"
import { View, RefreshControl, FlatList } from "react-native"
import qs from "qs-stringify"

import { methods } from "./methods"
import List from "./List"
import { normalize } from "../../../utils/scale"
import { Text } from "../../components"
import ListGridPreloader from "../Products/Preloader"

const PAGE_SIZE = 10

const fetchTransactions = async (url) => {
    const config = {
        sort: "id",
        sort_type: "desc",
    }

    const response = await methods.getTransactions(url + `&${qs(config)}`)

    const jsonResponse = response.data

    if (response.ok) {
        const transactions = jsonResponse.data

        return {
            transactions,
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

const Transactions = () => {
    const { data } = useSWR(`/transactions?page=${1}`, fetchTransactions)

    const renderItem = ({ item }) => {
        return <List key={item.id} item={item} />
    }

    console.log("Data", data)

    if (!data) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }

    return (
        <FlatList
            data={data.transactions}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            horizontal={false}
        />
    )
}

export default Transactions
