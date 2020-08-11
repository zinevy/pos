import React, { useCallback } from "react"
import { View } from "react-native"
import styled from "@emotion/native"
import { FieldArray } from "formik"

import ButtonGroupField from "../../../components/Fields/ButtonGroupField"
import AddOnGroupField from "../../../components/Fields/AddOnGroupField"

import { PRODUCT_TYPES } from "../constants"
import { normalize } from "../../../../utils/scale"

const ProductDetailsForm = ({ params, item, setFieldValue, values }) => {
    const renderAttributes = (value, index) => {
        const data = value.attribute.attribute_options
        const attribute = value.attribute

        if (data && data.length) {
            return (
                <View key={`field-attribute-${index}`}>
                    <ButtonGroupField
                        name={`attributes.${index}`}
                        id={`attributes.${index}`}
                        label={attribute.name}
                        onSelect={(name, position) => {
                            setFieldValue("quantity", "0")
                            setFieldValue(name, position)
                        }}
                        value={values.attributes[index]}
                        item={value}
                        options={data.map((value) => ({
                            name: value.name,
                            id: value.id,
                        }))}
                    />
                </View>
            )
        }
    }

    const renderAddOns = useCallback(() => {
        if (item.add_ons) {
            return (
                <View>
                    <AddOnGroupField
                        name="add_ons"
                        id="add_ons"
                        label="Addons"
                        onChange={(value) => setFieldValue("add_ons", value)}
                        value={values.add_ons}
                        params={params}
                        data={item.add_ons
                            .filter((value) => value.stock_quantity > 0)
                            .map((value) => ({
                                id: value.id,
                                name: value.name,
                                stock_quantity: value.stock_quantity,
                                price: value.price,
                                quantity_per_item: value.quantity_per_item,
                            }))}
                    />
                </View>
            )
        }

        return
    }, [item])

    return (
        <View>
            {item.type === PRODUCT_TYPES.VARIABLE && item.attributes.length && (
                <View style={{ marginBottom: normalize(10) }}>
                    <FieldArray
                        name="attributes"
                        render={({ form }) => {
                            return (
                                <View style={{ marginBottom: 0 }}>
                                    <View>{item.attributes.map(renderAttributes)}</View>
                                </View>
                            )
                        }}
                    />
                </View>
            )}
            <View style={{ marginBottom: normalize(20) }}>{renderAddOns()}</View>
        </View>
    )
}

export default ProductDetailsForm
