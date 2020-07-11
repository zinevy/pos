import React, { memo, useCallback } from "react"
import { View } from "react-native"
import styled from "@emotion/native"

import InputField from "../../components/Fields/InputField"
import ButtonGroupField from "../../components/Fields/ButtonGroupField"

const Text = styled.Text(({ theme }) => ({
    color: theme.main.color,
}))

const VARIATION_TYPE = {
    SIMPLE: "simple",
    VARIABLE: "variable",
}

const ProductDetailsForm = memo(({ handleChange, item, setFieldValue, values }) => {
    const renderVariations = useCallback(() => {
        if (item.type === VARIATION_TYPE.VARIABLE && item.variations.length) {
            console.log(item.variations)
            return (
                <ButtonGroupField
                    name="variations"
                    id="variations"
                    label="Variations"
                    onSelect={(index) => setFieldValue("variations", index)}
                    value={values.variations}
                    options={item.variations.filter((value) => {
                        value.disabled = false
                        if (value.stock_quantity <= 0) {
                            value.disabled = true
                        }

                        return value
                    })}
                />
            )
        }

        return
    }, [item])

    return (
        <View style={{}}>
            <View style={{ marginBottom: 0 }}>
                {renderVariations()}

                <InputField name="addons" label="Add ons" onChangeText={handleChange("addons")} value={values.addons} />
            </View>
        </View>
    )
})

export default ProductDetailsForm
