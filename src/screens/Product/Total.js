import React, { useEffect, memo, useState, useMemo } from "react"
import { useFormikContext } from "formik"

import { FORM_FIELDS, PRODUCT_TYPES } from "./constants"
import { getTotalAddOn, getSelectedAttribute } from "../Sales/utils"
import IconType from "../../components/Button/IconType"

const Total = memo(({ item, title, disabled, onPress }) => {
    const { values, submitForm } = useFormikContext()
    const [total, setTotal] = useState(0)

    useEffect(() => {
        let formValues = {}
        const keys = Object.keys(values)

        if (keys.includes(FORM_FIELDS.ATTRIBUTES)) {
            const selected_attribute = getSelectedAttribute(values.attributes, {
                attributes: item.attributes,
                variations: item.variations,
            })

            if (selected_attribute) {
                formValues.price = selected_attribute.price
            } else {
                formValues.price = 0
            }
        } else if (item.type === PRODUCT_TYPES.SIMPLE) {
            formValues.price = item.price
        }

        if (keys.includes(FORM_FIELDS.QUANTITY)) {
            formValues.quantity = Number(values.quantity)
        }

        if (keys.includes(FORM_FIELDS.ADD_ONS)) {
            formValues.add_ons = values.add_ons
        }

        calculateTotal(formValues)
    }, [values])

    const calculateTotal = (values) => {
        let total = 0
        total += parseFloat(values.price)

        total = total * Number(values.quantity)

        if (values.add_ons) {
            total += getTotalAddOn(values.add_ons)
        }

        setTotal(total)
    }

    return useMemo(() => {
        return <IconType total={total} title={title} disabled={disabled} onPress={onPress} />
    }, [total, disabled])
})

export default Total
