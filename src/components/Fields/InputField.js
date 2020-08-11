import React, { Fragment } from "react"
import { useField } from "formik"
import { View } from "react-native"
import styled from "@emotion/native"
import { useTheme } from "emotion-theming"

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
    fontFamily: theme.fontFamily.regular,
    margin: 0,
}))

const SecondaryInputField = styled.TextInput(({ theme }) => ({
    color: theme.login.field.textColor,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.login.field.borderColor,
    padding: normalize(15),
    borderRadius: normalize(10),
    fontSize: 14,
    fontFamily: theme.fontFamily.regular,
    margin: 0,
}))

const InputField = ({ label, type, description, login, ...props }) => {
    const [field, meta] = useField(props)
    const theme = useTheme()

    return (
        <View style={{ marginBottom: normalize(10) }}>
            <View style={{ marginBottom: normalize(10) }}>
                {label && <Text>{label}</Text>}
                {description && <Text>{description}</Text>}
            </View>
            <SecondaryInputField {...props} {...field} placeholderTextColor={theme.login.field.textColor} />
            <View style={{ marginBottom: 10 }}>
                {meta.touched && meta.error && <Text style={{ color: "#F00", marginTop: 10 }}>{meta.error}</Text>}
            </View>
        </View>
    )
}

export default InputField
