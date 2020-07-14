import React, { useContext, memo, useState } from "react"
import { View } from "react-native"
import { Formik } from "formik"
import { object, string } from "yup"

import { AppContext } from "../../../Main"

import { Text, LazyImage, Button } from "../../../components"
import { normalizeHeight, normalize } from "../../../../utils/scale"
import ProductDetailsForm from "./DetailsForm"
import Total from "../Total"
import { getImageUrl } from "../../../../utils/getImageUrl"
import InputField from "../../../components/Fields/InputField"
import StepperField from "../../../components/Fields/StepperField"
import { formatCurrency } from "../../../../utils/formatter"
import { PRODUCT_TYPES, FORM_FIELDS } from "../constants"

const validationSchema = object().shape({
    addons: string().label("Addons"),
    variations: string().label("Variations").required(),
})

const initialValues = {
    quantity: "1",
    addons: "",
    variations: "",
}

const VariableProduct = memo(({ data, navigation, error }) => {
    const { addToCart } = useContext(AppContext)
    const [formValues, setFormValues] = useState({ quantity: 1, price: 0 })

    const mapFormValues = (key, value) => {
        let formValues = {}

        if (key && data[key]) {
            formValues[key] = data[key][value]
        }

        if (key === FORM_FIELDS.VARIATIONS) {
            formValues.price = data[key][value].price
        } else if (key === FORM_FIELDS.QUANTITY) {
            formValues.quantity = Number(value)
        }

        setFormValues((prev) => ({
            ...prev,
            ...formValues,
        }))
    }

    const onSubmit = (value) => {
        const item = {
            type: PRODUCT_TYPES.VARIABLE,
            name: data.name,
            price: formatCurrency(data.price),
            quantity: Number(value.quantity),
            product_id: data.id,
        }

        console.log("value", item)
        addToCart(item, {
            onSuccess: () => {
                navigation.goBack()
            },
        })
    }

    return (
        <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => {
                return (
                    <View style={{ margin: 20 }}>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ fontSize: 20 }}>{data.name}</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                flexWrap: "wrap",
                            }}>
                            <View style={{ marginBottom: 20, width: "50%" }}>
                                <LazyImage
                                    style={{
                                        width: "100%",
                                        height: normalizeHeight(200),
                                        borderRadius: 10,
                                    }}
                                    source={getImageUrl(data.image)}
                                />
                                <Text>{data.description}</Text>
                                <StepperField
                                    name="quantity"
                                    label="Quantity"
                                    onChange={(value) => {
                                        mapFormValues("quantity", value)
                                        setFieldValue("quantity", value)
                                    }}
                                    value={values.quantity}
                                />
                                <Total values={formValues} />
                            </View>
                            <View style={{ padding: normalize(10) }}>
                                {error && (
                                    <View style={{ alignItems: "center", marginBottom: 20 }}>
                                        <Text>{error}</Text>
                                    </View>
                                )}

                                <InputField
                                    name="addons"
                                    label="Add ons"
                                    onChangeText={handleChange("addons")}
                                    value={values.addons}
                                />

                                <ProductDetailsForm
                                    setFieldValue={(key, value) => {
                                        mapFormValues(key, value)
                                        setFieldValue(key, value)
                                    }}
                                    values={values}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    item={{
                                        type: data.type,
                                        variations: data.variations,
                                    }}
                                />
                            </View>
                        </View>
                        <Button title="Submit" onPress={handleSubmit} />
                    </View>
                )
            }}
        </Formik>
    )
})

export default VariableProduct
