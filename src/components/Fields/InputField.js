import React, { Fragment } from "react"
import { useField } from "formik"
import { View } from "react-native"
import styled from "@emotion/native"
import { normalize } from "../../../utils/scale"

const Text = styled.Text(({ theme }) => ({
    color: theme.main.color,
}))

const TextInputField = styled.TextInput(({ theme }) => ({
    color: theme.main.color,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "green",
    padding: normalize(15),
    borderRadius: normalize(10),
    fontSize: normalize(15),
    margin: 0,
}))

const InputField = ({ label, type, description, ...props }) => {
    const [field, meta] = useField(props)

    return (
        <View style={{ marginBottom: normalize(10) }}>
            <View style={{ marginBottom: normalize(10) }}>
                {label && <Text>{label}</Text>}
                {description && <Text>{description}</Text>}
            </View>
            <TextInputField {...field} {...props} />
            <View style={{ marginBottom: normalize(10) }}>
                {meta.touched && meta.error && <Text>{meta.error}</Text>}
            </View>
        </View>
    )
}

export default InputField
