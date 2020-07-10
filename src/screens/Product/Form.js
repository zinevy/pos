import React, { memo } from "react"
import { View } from "react-native"
import styled from "@emotion/native"

import InputField from "../../components/Fields/InputField"
import ButtonGroupField from "../../components/Fields/ButtonGroupField"

const Text = styled.Text(({ theme }) => ({
    color: theme.main.color,
}))

const ProductDetailsForm = memo(({ handleChange, item, setFieldValue, values }) => {
    return (
        <View style={{}}>
            <View style={{ marginBottom: 0 }}>
                {item.variations.length ? (
                    <ButtonGroupField
                        name="variations"
                        id="variations"
                        label="Variations"
                        onSelect={(index) => setFieldValue("variations", index)}
                        value={values.variations}
                        options={item.variations}
                    />
                ) : null}

                <InputField name="addons" label="Add ons" onChangeText={handleChange("addons")} value={values.addons} />
            </View>
        </View>
    )
})

export default ProductDetailsForm
