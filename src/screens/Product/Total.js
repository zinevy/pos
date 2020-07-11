import React, { useEffect, useRef } from "react"
import { View } from "react-native"
import { Text } from "../../components"
import { formatCurrency } from "../../../utils/formatter"

const Total = ({ values }) => {
    let total = 0

    if (values.variations && !values.simple) {
        total += parseFloat(values.variations.price)
    }

    if (values.simple && !values.variations) {
        total += parseFloat(values.simple.price)
    }

    console.log("TOTAL", values)

    return (
        <View>
            <Text>Total: {formatCurrency(total)}</Text>
        </View>
    )
}

export default Total
