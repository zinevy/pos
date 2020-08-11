import React, { memo } from "react"
import { View, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { LazyImage, Text } from "../../components"
import { normalize } from "../../../utils/scale"
import { getImageUrl } from "../../../utils/getImageUrl"

const Item = memo(({ item }) => {
    const navigation = useNavigation()

    return (
        <View
            style={{
                width: `${100 / 3}%`,
                padding: normalize(10),
                paddingTop: 0,
                justifyContent: "space-between",
                boxSizing: "border-box",
            }}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("ProductDetails", { ...item, edit: false })
                }}>
                <LazyImage
                    source={getImageUrl(item.image)}
                    style={{
                        width: "100%",
                        height: normalize(180),
                        borderRadius: normalize(10),
                        marginBottom: 10,
                    }}
                />
                <View>
                    <Text
                        bold
                        style={{
                            fontSize: 14,
                            marginBottom: 10,
                        }}>
                        {item.name}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
})

export default Item
