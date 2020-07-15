import React, { memo, useCallback } from "react"
import { View } from "react-native"
import styled from "@emotion/native"

import ButtonGroupField from "../../../components/Fields/ButtonGroupField"
import AddOnGroupField from "../../../components/Fields/AddOnGroupField"

import { PRODUCT_TYPES } from "../constants"

const Text = styled.Text(({ theme }) => ({
    color: theme.main.color,
}))

const ProductDetailsForm = ({ item, setFieldValue, values }) => {
    const renderVariations = useCallback(() => {
        if (item.type === PRODUCT_TYPES.VARIABLE && item.variations.length) {
            return (
                <ButtonGroupField
                    name="variations"
                    id="variations"
                    label="Sizes"
                    onSelect={(index) => {
                        setFieldValue("variations", index)
                        setFieldValue("quantity", "1")
                    }}
                    value={values.variations}
                    options={item.variations
                        .filter((value) => value.stock_quantity > 0)
                        .map((value) => ({
                            name: value.name,
                        }))}
                />
            )
        }

        return
    }, [item])

    const renderAddOns = useCallback(() => {
        if (item.add_ons) {
            return (
                <AddOnGroupField
                    name="add_ons"
                    id="add_ons"
                    label="Addons"
                    onChange={(index) => setFieldValue("add_ons", index)}
                    value={values.add_ons}
                    data={item.add_ons
                        .filter((value) => value.stock_quantity > 0)
                        .map((value) => ({
                            id: value.id,
                            name: value.name,
                            stock_quantity: value.stock_quantity,
                            price: value.price,
                        }))}
                />
            )
        }

        return
    }, [item])

    return (
        <View>
            <View style={{ marginBottom: 0 }}>{renderVariations()}</View>
            <View style={{ marginBottom: 0 }}>{renderAddOns()}</View>
        </View>
    )
}

export default ProductDetailsForm
