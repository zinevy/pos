import React, { useContext, memo, useState, useEffect } from "react"
import { View } from "react-native"
import useSWR from "swr"
import { Formik } from "formik"
import { object, string } from "yup"

import withScreen from "../../../utils/hoc/createScreen"
import { AppContext } from "../../Main"

import { Text, LazyImage, Button } from "../../components"
import { normalizeHeight, normalize } from "../../../utils/scale"
import { methods } from "../Sales/methods"
import ProductDetailsForm from "./Form"
import InputField from "../../components/Fields/InputField"
import Total from "./Total"

const validationSchema = object().shape({
    variation: string().label("Variation").required(),
})

const initialValues = { variations: "", addons: "" }

const fetchProduct = async (id) => {
    const response = await methods.getProduct({ id })
    const jsonResponse = response.data

    if (response.ok) {
        const item = jsonResponse.data

        return item
    }

    return {}
}

const Product = memo(({ route, navigation, disabled, loading, hasError, error }) => {
    const item = route.params
    const { addToCart } = useContext(AppContext)
    const { data, error: dataError } = useSWR([item.id], fetchProduct)
    const [formValues, setFormValues] = useState({})

    useEffect(() => {
        if (data && data.type === "simple") {
            console.log("details", data)
            const initformValues = {
                simple: {
                    price: data.price,
                },
            }

            setFormValues(initformValues)
        }
    }, [data])

    if (dataError) {
        return (
            <View>
                <Text>Error</Text>
            </View>
        )
    }

    if (!data) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }

    const mapFormValues = (key, value) => {
        let formValues = {}

        if (key && data[key]) {
            formValues[key] = data[key][value]
        }

        setFormValues(formValues)
    }

    const onSubmit = (value) => {
        console.log("value", value)
    }

    return (
        <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => (
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
                                source={{ uri: data.image }}
                            />
                            <Text>{data.description}</Text>
                            <Total values={formValues} />
                        </View>
                        <View style={{ padding: normalize(10) }}>
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
                                    variations: data.variations,
                                }}
                            />
                        </View>
                    </View>
                    <Button
                        title="Submit"
                        onPress={handleSubmit}
                        // onPress={() => {
                        //     item.quantity = 1
                        //     addToCart(item)
                        //     navigation.goBack()
                        // }}
                    />
                </View>
            )}
        </Formik>
    )
})

export default withScreen()(Product)
