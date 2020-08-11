import React, { memo } from "react"
import { View } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { Text } from "../../components"

const List = memo(({ item }) => {
    const navigation = useNavigation()

    return (
        <View style={{ width: "100%" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text>{item.id}</Text>
                <Text>{item.transaction_date}</Text>
            </View>
        </View>
    )
})

export default List
