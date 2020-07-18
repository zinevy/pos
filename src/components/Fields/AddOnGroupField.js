import React, { useState, useEffect, useMemo, useCallback } from "react"
import { StyleSheet, View } from "react-native"
import { Input, Button } from "react-native-elements"
import { useField } from "formik"
import zipWith from "lodash/zipWith"

import Text from "../Text"
import { formatCurrency } from "../../../utils/formatter"

const styles = StyleSheet.create({
    group: {
        marginBottom: 20,
    },
    fieldGroup: {
        flexDirection: "row",
        flexWrap: "wrap",
        position: "relative",
        justifyContent: "space-between",
        borderRadius: 15,
        overflow: "hidden",
        // borderWidth: 3,
        margin: 6,
        marginBottom: 12,
    },
    control: {
        width: 50,
        height: 45,
        justifyContent: "center",
        borderRadius: 15,
    },
    input: {
        textAlign: "center",
    },
    text: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 15,
    },
    label: {
        marginBottom: 6,
        fontWeight: "bold",
        fontSize: 18,
    },
    error: {
        fontSize: 12,
        color: "#F00",
        marginTop: 10,
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

    const onIncrementValue = useCallback(
        (value) => {
            const add_ons = data.map((res) => {
                if (res.id === value.id) {
                    res.quantity = Number(res.quantity) + 1
                }

                return res
            })
            updateData(add_ons)
            onChange(add_ons)
        },
        [data]
    )

    const renderAddOn = (value, index) => {
        return (
            <View key={`add-on-${value.id}`} style={{ width: "50%" }}>
                <View style={{ ...styles.fieldGroup, borderColor: "#EEE", flexDirection: "row" }}>
                    <View>
                        <Button
                            disabled={Number(value.quantity) < 1}
                            buttonStyle={{
                                ...styles.control,
                            }}
                            titleStyle={{
                                ...styles.text,
                                color: "#FFF",
                            }}
                            onPress={() => onDecrementValue(value)}
                            title="-"
                        />
                    </View>
                    <View
                        style={{
                            flex: 1,
                            flexGrow: 1,
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                        <Text style={{ fontSize: 16 }}>
                            {value.name} - {formatCurrency(value.price)} {value.quantity > 0 && `(${value.quantity})`}
                        </Text>
                    </View>
                    <View>
                        <Button
                            disabled={Number(value.quantity) >= +value.stock_quantity}
                            buttonStyle={{
                                ...styles.control,
                            }}
                            titleStyle={{
                                ...styles.text,
                                color: "#FFF",
                            }}
                            onPress={() => onIncrementValue(value)}
                            title="+"
                        />
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View>
            {label && <Text style={styles.label}>{label}</Text>}

            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {data.map((value, index) => renderAddOn(value, index))}
            </View>

            {meta.touched && meta.error && <Text style={styles.error}>{meta.error}</Text>}
        </View>
    )
}

export default AddOnGroupField
