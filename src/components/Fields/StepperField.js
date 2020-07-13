import React from "react"
import { StyleSheet, View } from "react-native"
import { Input, Button } from "react-native-elements"
import { useField } from "formik"

import Text from "../Text"

const styles = StyleSheet.create({
    group: {
        marginBottom: 20,
    },
    fieldGroup: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        position: "relative",
        justifyContent: "space-between",
        // borderWidth: 3,
        borderRadius: 15,
        borderColor: "#EEE",
        overflow: "hidden",
    },
    control: {
        width: 60,
        height: 50,
        justifyContent: "center",
        borderRadius: 15,
    },
    input: {
        textAlign: "center",
    },
    text: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 16,
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

const StepperField = ({ label, type, description, onChange, max, ...props }) => {
    const [field, meta] = useField(props)
    let itemProps = {}

    const onDecrementValue = () => {
        const value = Number(field.value) - 1

        onChange(value.toString())
    }

    const onIncrementValue = () => {
        const value = Number(field.value) + 1

        onChange(value.toString())
    }

    return (
        <View style={styles.group}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.fieldGroup}>
                <View>
                    <Button
                        disabled={Number(field.value) <= 1}
                        buttonStyle={{
                            ...styles.control,
                        }}
                        titleStyle={{
                            ...styles.text,
                            color: "#FFF",
                        }}
                        onPress={() => onDecrementValue()}
                        title="-"
                    />
                </View>
                <View style={{ flex: 1, flexGrow: 1, width: 200 }}>
                    <Input
                        {...field}
                        {...props}
                        keyboardType="numeric"
                        containerStyle={{}}
                        editable={false}
                        inputContainerStyle={{
                            borderTopWidth: 0,
                            borderBottomWidth: 0,
                            height: 50,
                            marginLeft: -10,
                            marginRight: -10,
                        }}
                        inputStyle={{
                            fontSize: 18,
                            color: "#000",
                            fontWeight: "bold",
                            textAlign: "center",
                            borderBottomWidth: 0,
                        }}
                    />
                </View>
                <View>
                    <Button
                        disabled={Number(field.value) >= Number(max)}
                        buttonStyle={{
                            ...styles.control,
                        }}
                        titleStyle={{
                            ...styles.text,
                            color: "#FFF",
                        }}
                        onPress={() => onIncrementValue()}
                        title="+"
                    />
                </View>
            </View>
            {meta.touched && meta.error && <Text style={styles.error}>{meta.error}</Text>}
        </View>
    )
}

export default StepperField
