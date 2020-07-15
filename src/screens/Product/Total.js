import React, { useEffect, useRef, useState, useMemo } from "react"
import { View } from "react-native"
import { Text } from "../../components"
import { formatCurrency } from "../../../utils/formatter"

const Total = ({ values }) => {
    const [total, setTotal] = useState(0)

    const getTotalAddOn = (values) => {
        return values.reduce((sum, item) => {
            const curr = +item.quantity * parseFloat(item.price).toFixed(2)
            let total = sum + curr

            return total
        }, 0)
    }

    useEffect(() => {
        let total = 0
        total += parseFloat(values.price)

        total = total * Number(values.quantity)

        if (values.add_ons) {
            total += getTotalAddOn(values.add_ons)
        }

        setTotal(total)
    }, [values])

    return useMemo(() => {
        return (
            <View>
                <Text>Total: {formatCurrency(total)}</Text>
            </View>
        )
    }, [total])
}

export default Total
