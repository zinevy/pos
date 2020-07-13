import React, { useEffect, useRef, useState, useMemo } from "react"
import { View } from "react-native"
import { Text } from "../../components"
import { formatCurrency } from "../../../utils/formatter"

const Total = ({ values }) => {
    const [total, setTotal] = useState(0)

    useEffect(() => {
        let total = 0
        total += parseFloat(values.price)

        total = total * Number(values.quantity)

        setTotal(total)
    }, [values])

    return useMemo(() => {
        console.log("TOTAL", values)
        return (
            <View>
                <Text>Total: {formatCurrency(total)}</Text>
            </View>
        )
    }, [total])
}

export default Total
