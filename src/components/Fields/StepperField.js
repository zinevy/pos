import React from "react"
import { StyleSheet, View } from "react-native"
import { useField } from "formik"
import { useTheme } from "emotion-theming"
import styled from "@emotion/native"

import Text from "../Text"
import { Label } from "./styles"
import { normalize } from "../../../utils/scale"
import Stepper from "./Stepper"

const Error = styled(Text)({
    fontSize: 12,
    color: "#F00",
    textAlign: "right",
})

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
        marginBottom: normalize(5),
    },
})

const StepperField = ({ label, type, description, onChange, max, ...props }) => {
    const [field, meta] = useField(props)
    const theme = useTheme()

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
            {label && <Label bold>{label}</Label>}
            <View style={{ marginBottom: normalize(5) }}>
                <Stepper
                    disabled={Number(field.value) >= Number(max) && Number(field.value) <= 0}
                    title={field.value}
                    onIncrement={onIncrementValue}
                    onDecrement={onDecrementValue}
                    incrementDisabled={Number(field.value) >= Number(max)}
                    decrementDisabled={Number(field.value) <= 0}
                />
            </View>
            {meta.touched && meta.error && <Error style={styles.error}>{meta.error}</Error>}
        </View>
    )
}

export default StepperField
