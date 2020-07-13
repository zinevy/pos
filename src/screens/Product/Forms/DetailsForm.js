import React, { memo, useCallback } from "react"
import { View } from "react-native"
import styled from "@emotion/native"

import ButtonGroupField from "../../../components/Fields/ButtonGroupField"
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
                    onSelect={(index) => setFieldValue("variations", index)}
                    value={values.variations}
                    options={item.variations.filter((value) => value.stock_quantity > 0)}
                />
            )
        }

        return
    }, [item])

    return (
        <View style={{}}>
            <View style={{ marginBottom: 0 }}>{renderVariations()}</View>
        </View>
    )
}

export default ProductDetailsForm
