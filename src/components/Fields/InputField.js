import React from "react"
import { ErrorMessage, useField } from "formik"
import { View, Text, TextInput } from "react-native"
import styled from "@emotion/native"

const FieldText = styled(Text)(({ theme }) => ({
    color: theme.main.color,
}))

const FieldTextInput = styled(TextInput)(({ theme }) => ({
    color: theme.main.color,
}))

const InputField = ({ label, type, description, ...props }) => {
    const [field, meta] = useField(props)

    return (
        <View>
            <FieldText>{label}</FieldText>
            <FieldText>{description && description}</FieldText>
            <FieldTextInput {...field} {...props} />
            {meta.touched && meta.error && <FieldText>{meta.error}</FieldText>}
        </View>
    )
}

export default InputField
