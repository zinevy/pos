import React, { memo } from "react"
import { View, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { LazyImage, Text } from "../../components"
import { normalize } from "../../../utils/scale"
import { getImageUrl } from "../../../utils/getImageUrl"

const Item = memo(({ item }) => {
    const navigation = useNavigation()

    return (
        <View style={{ width: `33%`, padding: normalize(10), justifyContent: "space-between" }}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("ProductDetails", { ...item, edit: false })
                }}>
                <LazyImage
                    source={getImageUrl(item.image)}
                    style={{
                        width: "100%",
                        height: normalize(200),
                        borderRadius: normalize(10),
                        marginBottom: 10,
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
                </View>
            </TouchableOpacity>
        </View>
    )
})

export default Item
