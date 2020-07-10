import React, { useState, useEffect, useRef } from "react"
import { View } from "react-native"
import { Text } from "../../components"
import { formatCurrency } from "../../../utils/formatter"

const Total = ({ values }) => {
    const totalRef = useRef()

    useEffect(() => {
        let total = 0

        if (values.variations) {
            total += parseFloat(values.variations.price)
        }

        totalRef.current = total
    }, [values])

    return (
        <View>
            <Text>Total: {formatCurrency(totalRef.current) || 0}</Text>
        </View>
    )
}

export default Total
