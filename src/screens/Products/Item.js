import React, { memo, useContext } from "react"
import { View, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { LazyImage, Text, Button } from "../../components"
import { normalize } from "../../../utils/scale"
import { AppContext } from "../../Main"
import { formatCurrency } from "../../../utils/formatter"

const Item = memo(({ item }) => {
    const navigation = useNavigation()
    const { addToCart } = useContext(AppContext)

    return (
        <View style={{ padding: normalize(5), width: "100%", justifyContent: "space-between" }}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("ProductDetails", { ...item })
                }}>
                <LazyImage
                    source={{ uri: item.image }}
                    style={{
                        width: "100%",
                        height: normalize(100),
                        borderRadius: normalize(10),
                        marginBottom: 10,
                        resizeMode: "cover",
                    }}
                />
                <View>
                    <Text
                        style={{
                            fontSize: normalize(18),
                            fontWeight: "bold",
                            marginBottom: normalize(10),
                        }}>
                        {item.name}
                    </Text>
                    <Text style={{ marginBottom: normalize(10), fontSize: normalize(14) }}>
                        {formatCurrency(item.price)}
                    </Text>
                </View>
            </TouchableOpacity>
            <Button
                onPress={() => {
                    item.quantity = 1
                    addToCart(item)
                }}
                containerStyle={{ padding: normalize(14) }}
                title="Add to cart"
            />
        </View>
    )
})

export default Item
