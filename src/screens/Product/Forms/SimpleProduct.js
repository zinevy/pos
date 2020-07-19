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
})

const initialValues = {
    quantity: "1",
    add_ons: [],
}

const SimpleProduct = memo(({ data, navigation, error }) => {
    const { addToCart } = useContext(AppContext)

    const onSubmit = (value) => {
        const item = {
            type: PRODUCT_TYPES.SIMPLE,
            id: data.id,
            name: data.name,
            price: formatCurrency(data.price),
            quantity: Number(value.quantity),
            product_id: data.id,
            add_ons: value.add_ons.map((item) => ({
                quantity: Number(item.quantity),
                id: item.id,
                name: item.name,
                price: item.price,
                quantity_per_item: item.quantity_per_item,
                stock_quantity: item.stock_quantity,
            })),
        }

        addToCart(item, {
            onSuccess: () => {
                navigation.goBack()
            },
        })
    }

    return (
        <Formik
            enableReinitialize
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}>
            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => {
                return (
                    <View style={{ margin: 20 }}>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ fontSize: 20 }}>{data.name}</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
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
                                    max={data.stock_quantity}
                                    onChange={(value) => setFieldValue("quantity", value)}
                                    value={values.quantity}
                                />
                                <Total item={data} values={values} />
                            </View>
                            <View style={{ padding: normalize(10), width: "70%" }}>
                                {error && (
                                    <View style={{ alignItems: "center", marginBottom: 20 }}>
                                        <Text>{error}</Text>
                                    </View>
                                )}

                                <ProductDetailsForm
                                    setFieldValue={(key, value) => setFieldValue(key, value)}
                                    values={values}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    item={{
                                        type: data.type,
                                        add_ons: data.add_ons,
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

export default SimpleProduct
