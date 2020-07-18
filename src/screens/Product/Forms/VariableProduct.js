import React, { useContext, memo, useCallback } from "react"
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

const validationSchema = object().shape({
    add_ons: string().label("Addons"),
    variations: string().label("Variations").required(),
})

const initialValues = {
    quantity: "1",
    add_ons: [],
    variations: null,
}

const VariableProduct = memo(({ data, params, navigation, error }) => {
    const { addToCart } = useContext(AppContext)

    const getVariationByIndex = useCallback((index) => data.variations[index], [data])

    const onSubmit = (value) => {
        const variation = getVariationByIndex(value.variations)
        const item = {
            type: "variation",
            id: data.id,
            name: data.name,
            variation: {
                index: value.variations,
                name: variation.name,
            },
            price: formatCurrency(variation.price),
            quantity: Number(value.quantity),
            product_id: variation.id,
            add_ons: value.add_ons
                .filter((item) => +item.quantity > 0)
                .map((item) => ({
                    quantity: Number(item.quantity),
                    id: item.id,
                    name: item.name,
                    price: item.price,
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
                let max = 0

                if (data.variations[values.variations]) {
                    max = data.variations[values.variations].stock_quantity
                }

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
                                    max={max}
                                    onChange={(value) => setFieldValue("quantity", value)}
                                    value={values.quantity}
                                />
                                <Total item={data} values={values} />
                            </View>
                            <View style={{ padding: normalize(10), flexGrow: 1 }}>
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
                                    params={params}
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
