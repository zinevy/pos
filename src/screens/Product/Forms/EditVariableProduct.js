import React, { useContext, memo, useState } from "react"
import { View, ScrollView } from "react-native"
import { Formik } from "formik"
import { object, string } from "yup"

import { AppContext } from "../../../Main"
import ProductDetailsForm from "./DetailsForm"
import { getSelectedAttribute } from "../../Sales/utils"
import Item from "../Item"
import Total from "../Total"
import { FormContainer, FormWrapper, FormToolbar, FormItemDetails, FormSection } from "./styles"
import { CancelButton } from "./Toolbar"

const validationSchema = object().shape({
    add_ons: string().label("Addons"),
    quantity: string()
        .label("Quantity")
        .test("match", "Quantity is required", function (value) {
            return Number(value) > 0
        }),
})

const EditVariableProductForm = memo(({ addons, data, params, navigation }) => {
    const { updateCart } = useContext(AppContext)

    const [initialValues, setInitialValues] = useState({
        quantity: params.quantity.toString(),
        add_ons: params.add_ons,
        attributes: params.attributes,
    })

    const onSubmit = (value) => {
        const selected_variation = getSelectedAttribute(value.attributes, {
            attributes: data.attributes,
            variations: data.variations,
        })

        if (selected_variation && selected_variation.product) {
            delete selected_variation.product
        }

        const item = {
            type: "variation",
            id: data.id,
            name: data.name,
            index: params.index,
            product: {
                name: data.name,
                attributes: data.attributes,
                variations: data.variations,
            },
            attributes: value.attributes,
            variation: selected_variation,
            product_id: selected_variation.id,
            quantity: Number(value.quantity),
            add_ons: value.add_ons.map((item) => ({
                quantity: Number(item.quantity),
                id: item.id,
                name: item.name,
                price: item.price,
                quantity_per_item: item.quantity_per_item,
                stock_quantity: item.stock_quantity,
            })),
        }

        updateCart(item, {
            onSuccess: () => {
                navigation.goBack()
            },
        })
    }

    const onCancel = () => {
        navigation.goBack()
    }

    return (
        <Formik
            enableReinitialize
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}>
            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => {
                let max = 0
                let attribute

                if (values.attributes.length) {
                    attribute = getSelectedAttribute(values.attributes, {
                        attributes: data.attributes,
                        variations: data.variations,
                    })

                    if (attribute && attribute.stock_quantity) {
                        max = attribute.stock_quantity
                    }
                }
                return (
                    <FormContainer>
                        <FormWrapper>
                            <FormItemDetails>
                                <Item data={data} max={max} setFieldValue={setFieldValue} quantity={values.quantity} />
                            </FormItemDetails>
                            <FormSection>
                                <ScrollView style={{ flex: 1, height: "100%" }}>
                                    <ProductDetailsForm
                                        setFieldValue={(key, value) => setFieldValue(key, value)}
                                        values={values}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        params={params}
                                        item={{
                                            attributes: data.attributes,
                                            type: data.type,
                                            add_ons: addons,
                                            variations: data.variations,
                                        }}
                                    />
                                </ScrollView>
                            </FormSection>
                        </FormWrapper>
                        <FormToolbar>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <CancelButton />
                                <View style={{ width: 10 }}></View>
                                <Total item={data} disabled={!attribute} title="Update Item" onPress={handleSubmit} />
                            </View>
                        </FormToolbar>
                    </FormContainer>
                )
            }}
        </Formik>
    )
})

export default EditVariableProductForm
