import React, { useEffect, memo, useState, useMemo } from "react"
import { View } from "react-native"
import { Text } from "../../components"
import { formatCurrency } from "../../../utils/formatter"
import { FORM_FIELDS, PRODUCT_TYPES } from "./constants"

const Total = memo(({ values, item }) => {
    const [total, setTotal] = useState(0)

    useEffect(() => {
        let formValues = {}
        const keys = Object.keys(values)

        if (keys.includes(FORM_FIELDS.VARIATIONS)) {
            const variation = FORM_FIELDS.VARIATIONS
            if (item[variation][values[variation]]) {
                formValues.price = item[variation][values[variation]].price
            }
        }

        if (keys.includes(FORM_FIELDS.QUANTITY)) {
            formValues.quantity = Number(values.quantity)
        }

        if (keys.includes(FORM_FIELDS.ADD_ONS)) {
            formValues.add_ons = values.add_ons
        }

        if (item.type === PRODUCT_TYPES.SIMPLE) {
            formValues.price = item.price
        }

        calculateTotal(formValues)
    }, [values])

    const getTotalAddOn = (values) => {
        return values.reduce((sum, item) => {
            const curr = +item.quantity * parseFloat(item.price).toFixed(2)
            let total = sum + curr

            return total
        }, 0)
    }

    const calculateTotal = (values) => {
        let total = 0
        total += parseFloat(values.price)

        total = total * Number(values.quantity)

        if (values.add_ons) {
            total += getTotalAddOn(values.add_ons)
        }

        if (total) {
            setTotal(total)
        }
    }

    return useMemo(() => {
        return (
            <View>
                <Text>Total: {formatCurrency(total)}</Text>
            </View>
        )
    }, [total])
})

export default Total
