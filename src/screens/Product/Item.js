import React, { useMemo } from "react"
import { View } from "react-native"

import { LazyImage, Text } from "../../components"
import StepperField from "../../components/Fields/StepperField"
import { getImageUrl } from "../../../utils/getImageUrl"
import { normalize } from "../../../utils/scale"
import { getSelectedAttributesOption, getSelectedAttribute } from "../Sales/utils"
import { useFormikContext } from "formik"
import { PRODUCT_TYPES } from "./constants"
import { toCurrency } from "../../../utils/formatter"

const Item = ({ data, setFieldValue, max, quantity }) => {
    const { values } = useFormikContext()
    let attributes
    let product = data

    return useMemo(() => {
        if (data.type === PRODUCT_TYPES.VARIABLE) {
            attributes = getSelectedAttributesOption(values.attributes, {
                attributes: data.attributes,
            })
            product = getSelectedAttribute(values.attributes, {
                attributes: data.attributes,
                variations: data.variations,
            })
        }
        return (
            <View style={{ flexDirection: "column", flex: 1 }}>
                <View style={{ height: "35%" }}>
                    <LazyImage
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: normalize(8),
                        }}
                        source={getImageUrl(data.image)}
                    />
                </View>
                <View style={{ flexGrow: 1 }}>
                    <Text
                        bold
                        style={{
                            fontSize: 18,
                            marginBottom: normalize(5),
                            marginTop: normalize(5),
                        }}>
                        {data.name}
                    </Text>
                    {max <= 0 && <Text style={{ marginBottom: normalize(5), color: "#F00" }}>Out of stock</Text>}
                    {product && (
                        <View style={{ marginBottom: normalize(5) }}>
                            {data.type === PRODUCT_TYPES.SIMPLE && <Text>Price - {toCurrency(product.price)}</Text>}
                            {data.type === PRODUCT_TYPES.VARIABLE && (
                                <Text>
                                    {product.name} - {toCurrency(product.price)}
                                </Text>
                            )}
                        </View>
                    )}
                    {attributes && (
                        <View style={{ marginBottom: normalize(5) }}>
                            {attributes.map((item, index) => {
                                return (
                                    <View key={`item-attribute-${index}`}>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text>{item.name}</Text>
                                            <Text style={{ marginRight: normalize(10) }}>:</Text>
                                            <Text style={{ fontWeight: "bold" }}>{item.selected_option.name}</Text>
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                    )}
                    <StepperField
                        name="quantity"
                        label="Quantity"
                        max={max}
                        onChange={(value) => setFieldValue("quantity", value)}
                        value={quantity}
                    />
                </View>
            </View>
        )
    }, [data, quantity, values])
}

export default Item
