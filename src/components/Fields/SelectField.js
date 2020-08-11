import React, { Fragment, useState } from "react"
import { useField } from "formik"
import { View } from "react-native"
import styled from "@emotion/native"
import { Picker } from "@react-native-community/picker"
import { useTheme } from "emotion-theming"

import { normalize } from "../../../utils/scale"

const Text = styled.Text(({ theme }) => ({
    color: theme.login.field.color,
    fontFamily: theme.fontFamily.regular,
}))

const SelectField = ({ label, type, description, data, onSelect, ...props }) => {
    const [field, meta] = useField(props)
    const theme = useTheme()
    const [value, setValue] = useState(props.value)

    const renderItem = (value, index) => {
        return <Picker.Item key={`item-${index}`} label={value.name} value={index} />
    }

    return (
        <View style={{ marginBottom: normalize(10), flexDirection: "column" }}>
            <View style={{ marginBottom: normalize(10) }}>
                {label && <Text>{label}</Text>}
                {description && <Text>{description}</Text>}
            </View>
            <View
                style={{
                    borderWidth: 1,
                    borderColor: theme.login.field.borderColor,
                    borderRadius: normalize(10),
                    padding: normalize(5),
                }}>
                <Picker
                    itemStyle={{ fontSize: 10 }}
                    style={{ color: theme.login.field.color, borderWidth: 1, fontSize: 10 }}
                    selectedValue={value}
                    onValueChange={(v) => {
                        setValue(v)
                        console.log(v)
                        if (typeof onSelect === "function") {
                            onSelect(v)
                        }
                    }}>
                    {data.map(renderItem)}
                </Picker>
            </View>
            <View style={{ marginBottom: normalize(10) }}>
                {meta.touched && meta.error && <Text>{meta.error}</Text>}
            </View>
        </View>
    )
}

export default SelectField
