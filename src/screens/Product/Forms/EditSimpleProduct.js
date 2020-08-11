import React, { useContext, memo, useState } from "react"
import { View, ScrollView } from "react-native"
import { Formik } from "formik"
import { object, string } from "yup"

import { AppContext } from "../../../Main"
import ProductDetailsForm from "./DetailsForm"
import { formatCurrency } from "../../../../utils/formatter"
import { PRODUCT_TYPES } from "../constants"
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

const EditSimpleProduct = memo(({ addons, data, params, navigation }) => {
    const { updateCart } = useContext(AppContext)
    const [initialValues, setInitialValues] = useState({
        quantity: params.quantity.toString(),
        add_ons: params.add_ons,
    })

    const onSubmit = (value) => {
        const item = {
            type: PRODUCT_TYPES.SIMPLE,
            id: data.id,
            name: data.name,
            index: params.index,
            price: formatCurrency(data.price),
            quantity: Number(value.quantity),
            product_id: data.id,
            product: {
                name: data.name,
                attributes: data.attributes,
            },
            simple: {
                ...data,
                price: formatCurrency(data.price),
            },
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
                return (
                    <FormContainer>
                        <FormWrapper>
                            <FormItemDetails>
                                <Item
                                    data={data}
                                    max={data.stock_quantity}
                                    setFieldValue={setFieldValue}
                                    quantity={values.quantity}
                                />
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
                                            type: data.type,
                                            add_ons: addons,
                                        }}
                                    />
                                </ScrollView>
                            </FormSection>
                        </FormWrapper>
                        <FormToolbar>
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <CancelButton />
                                <View style={{ width: 10 }}></View>
                                <Total
                                    item={data}
                                    disabled={!data.stock_quantity}
                                    title="Update Cart Item"
                                    onPress={handleSubmit}
                                />
                            </View>
                        </FormToolbar>
                    </FormContainer>
                )
            }}
        </Formik>
    )
})

export default EditSimpleProduct
