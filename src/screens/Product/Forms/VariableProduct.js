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
import StepperField from "../../../components/Fields/StepperField"
import { formatCurrency } from "../../../../utils/formatter"
import { PRODUCT_TYPES, FORM_FIELDS } from "../constants"

const validationSchema = object().shape({
    add_ons: string().label("Addons"),
    variations: string().label("Variations").required(),
})

const initialValues = {
    quantity: "1",
    add_ons: [],
    variations: "",
}

const VariableProduct = memo(({ data, navigation, error }) => {
    const { addToCart } = useContext(AppContext)
    const [formValues, setFormValues] = useState({
        quantity: 1,
        price: 0,
        add_ons: [],
        variations: {
            stock_quantity: 0,
        },
    })

    const mapFormValues = (key, value) => {
        let formValues = {}

        if (key && data[key]) {
            formValues[key] = data[key][value]
        }

        if (key === FORM_FIELDS.VARIATIONS) {
            formValues.price = data[key][value].price
        } else if (key === FORM_FIELDS.QUANTITY) {
            formValues.quantity = Number(value)
        } else if (key === FORM_FIELDS.ADD_ONS) {
            formValues.add_ons = value
        }

        setFormValues((prev) => ({
            ...prev,
            ...formValues,
        }))
    }

    const onSubmit = (value) => {
        const item = {
            type: "variation",
            name: data.name,
            price: formatCurrency(data.price),
            quantity: Number(value.quantity),
            product_id: data.id,
            add_ons: value.add_ons
                .filter((item) => +item.quantity > 0)
                .map((item) => ({
                    quantity: Number(item.quantity),
                    id: item.id,
                    name: item.name,
                })),
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
                            <View style={{ marginBottom: 20, width: "30%" }}>
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
                                    max={formValues.variations.stock_quantity}
                                    onChange={(value) => {
                                        mapFormValues("quantity", value)
                                        setFieldValue("quantity", value)
                                    }}
                                    value={values.quantity}
                                />
                                <Total values={formValues} />
                            </View>
                            <View style={{ padding: normalize(10), flexGrow: 1 }}>
                                {error && (
                                    <View style={{ alignItems: "center", marginBottom: 20 }}>
                                        <Text>{error}</Text>
                                    </View>
                                )}

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
                                        add_ons: data.add_ons,
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
