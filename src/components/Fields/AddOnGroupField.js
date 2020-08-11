import React, { useState, useEffect, useCallback } from "react"
import { StyleSheet, View } from "react-native"
import { useField } from "formik"

import Text from "../Text"
import { formatCurrency, toCurrency } from "../../../utils/formatter"
import { normalize } from "../../../utils/scale"
import { Label } from "./styles"
import Stepper from "./Stepper"

const styles = StyleSheet.create({
    group: {
        marginBottom: 20,
    },
    fieldGroup: {
        flexDirection: "row",
        flexWrap: "wrap",
        position: "relative",
        justifyContent: "space-between",
        overflow: "hidden",
        margin: 3,
        backgroundColor: "#4AB577",
        borderRadius: 8,
    },
    control: {
        width: 50,
        height: 60,
        justifyContent: "center",
        borderRadius: 15,
        backgroundColor: "transparent",
    },
    input: {
        textAlign: "center",
    },
    text: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 20,
    },
    error: {
        fontSize: 12,
        color: "#F00",
        marginTop: 5,
        textAlign: "right",
    },
})

const AddOnGroupField = ({ label, type, description, onChange, params, item, initialValues, max, ...props }) => {
    const [field, meta] = useField(props)
    const [data, updateData] = useState(props.data)

    useEffect(() => {
        if (data && data.length) {
            const add_ons = data.map((item) => {
                item.quantity = 0
                return item
            })
            updateData(add_ons)
        }
    }, [])

    useEffect(() => {
        if (params && params.edit && props.value.length) {
            updateData(props.value)
        }
    }, [props.value])

    const onDecrementValue = (value) => {
        const add_ons = data.map((res) => {
            if (res.id === value.id) {
                res.quantity = Number(res.quantity) - 1
            }

            return res
        })
        updateData(add_ons)
        onChange(add_ons)
    }

    const onIncrementValue = (value) => {
        const add_ons = data.map((res) => {
            if (res.id === value.id) {
                res.quantity = Number(res.quantity) + 1
            }

            return res
        })
        updateData(add_ons)
        onChange(add_ons)
    }

    const renderTitle = (value) => {
        const title = value.name.length > 17 ? `${value.name.substring(0, 17 - 3)}...` : value.name
        return title
    }

    const renderSubTitle = (value) => {
        return `${toCurrency(value.price)} ${value.quantity ? `(${value.quantity})` : ``}`
    }

    const renderAddOn = (value, index) => {
        return (
            <View
                key={`add-on-${value.id}`}
                style={{
                    width: `${100 / 3}%`,
                    padding: normalize(3),
                    paddingBottom: 0,
                    // paddingRight: index % 3 === 0 ? normalize(5) : normalize(0),
                }}>
                <Stepper
                    title={renderTitle(value)}
                    subtitle={renderSubTitle(value)}
                    onIncrement={() => onIncrementValue(value)}
                    onDecrement={() => onDecrementValue(value)}
                    decrementDisabled={Number(value.quantity) < 1}
                    incrementDisabled={Number(value.quantity) >= Number(value.stock_quantity)}
                />
            </View>
        )
    }

    return (
        <View>
            {label && <Label bold>{label}</Label>}
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {data.map((value, index) => renderAddOn(value, index))}
            </View>
            {meta.touched && meta.error && <Text style={styles.error}>{meta.error}</Text>}
        </View>
    )
}

export default AddOnGroupField
