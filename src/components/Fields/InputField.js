import React from "react"
import { useField } from "formik"
import { View } from "react-native"
import styled from "@emotion/native"

const Text = styled.Text(({ theme }) => ({
    color: theme.main.color,
}))

const TextInput = styled.TextInput(({ theme }) => ({
    color: theme.main.color,
}))

const InputField = ({ label, type, description, ...props }) => {
    const [field, meta] = useField(props)

    return (
        <View>
            <Text>{label}</Text>
            <Text>{description && description}</Text>
            <TextInput {...field} {...props} />
            {meta.touched && meta.error && <Text>{meta.error}</Text>}
        </View>
    )
}

export default InputField
