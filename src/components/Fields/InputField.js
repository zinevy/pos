import React from "react"
import { useField } from "formik"
import { View } from "react-native"
import styled from "@emotion/native"

const Text = styled.Text(({ theme }) => ({
    color: theme.main.color,
}))

const TextInput = styled.TextInput(({ theme }) => ({
    color: theme.main.color,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "green",
    padding: 20,
    borderRadius: 20,
    margin: 0,
}))

const InputField = ({ label, type, description, ...props }) => {
    const [field, meta] = useField(props)

    return (
        <View>
            <Text>{label}</Text>
            <Text>{description && description}</Text>
            <TextInput {...field} {...props} />
            <View style={{ marginTop: 5 }}>{meta.touched && meta.error && <Text>{meta.error}</Text>}</View>
        </View>
    )
}

export default InputField
