import React, { Fragment } from "react"
import { useField } from "formik"
import { View } from "react-native"
import styled from "@emotion/native"

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
    padding: 20,
    borderRadius: 20,
    margin: 0,
}))

const InputField = ({ label, type, description, ...props }) => {
    const [field, meta] = useField(props)

    return (
        <Fragment>
            {label && <Text>{label}</Text>}
            {description && <Text>{description}</Text>}
            <TextInputField {...field} {...props} />
            <View style={{ marginBottom: 10 }}>{meta.touched && meta.error && <Text>{meta.error}</Text>}</View>
        </Fragment>
    )
}

export default InputField
