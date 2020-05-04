import React from "react"
import { ErrorMessage, useField } from "formik"
import { View, Text, TextInput } from "react-native"

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
