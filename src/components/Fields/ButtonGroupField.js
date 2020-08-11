import React, { useCallback } from "react"
import { useField } from "formik"
import { View } from "react-native"
import styled from "@emotion/native"
import { ButtonGroup } from "react-native-elements"
import { useTheme } from "emotion-theming"

import { normalize } from "../../../utils/scale"

const TextButton = styled.Text(({ theme, isActive }) => ({
    color: theme.button.color,
    fontFamily: isActive ? theme.fontFamily.bold : theme.fontFamily.regular,
}))

const renderButtonField = (value, index, currentValue) => {
    let props = { isActive: false }

    if (currentValue === index) {
        props = {
            isActive: true,
            style: {
                color: "#FFF",
            },
        }
    }

    return <TextButton {...props}>{value.name}</TextButton>
}

const ButtonGroupField = ({ label, type, description, selectMultiple, onSelect, options, ...props }) => {
    const [field, meta] = useField(props)
    const theme = useTheme()

    const buttons = options.map((value, index) => ({
        element: (param) => renderButtonField(value, index, field.value),
    }))

    const onButtonSelect = useCallback(
        (index) => {
            onSelect(field.name, index)
        },
        [options, onSelect]
    )

    const config = {
        containerStyle: {
            height: theme.button.height,
            marginLeft: 0,
            marginRight: 0,
            borderTopWidth: 0,
            borderLeftWidth: 0,
            backgroundColor: "transparent",
            borderRightWidth: 0,
            borderBottomWidth: 0,
            overflow: "hidden",
            marginBottom: 0,
            marginTop: 0,
        },
        textStyle: {
            fontSize: normalize(16),
            color: theme.button.color,
        },
        innerBorderStyle: {
            width: 0,
        },
        buttonStyle: {
            backgroundColor: "transparent",
            borderTopWidth: 3,
            borderRightWidth: 3,
            borderLeftWidth: 3,
            borderBottomWidth: 3,
            borderTopColor: "#EEE",
            borderBottomColor: "#EEE",
            borderRightColor: "#EEE",
            borderLeftColor: "#EEE",
            borderRadius: normalize(8),
            margin: normalize(3),
            marginBottom: normalize(6),
            marginTop: 0,
            overflow: "hidden",
        },
        selectedButtonStyle: {
            backgroundColor: "#4AB577",
        },
        selectedTextStyle: {
            color: "#FFF",
            fontWeight: "bold",
        },
        ...props,
    }

    return (
        <View style={{ width: "100%", marginBottom: 0 }}>
            {/* <View style={{ marginBottom: normalize(3) }}>
                {label && <Label>{label}</Label>}
                {description && <Text>{description}</Text>}
            </View> */}
            <ButtonGroup
                {...config}
                name={field.name}
                buttons={buttons}
                onPress={onButtonSelect}
                selectedIndex={props.value}
            />
            {/* <View style={{ marginBottom: normalize(5) }}>
                {meta.touched && meta.error && <Text>{meta.error}</Text>}
            </View> */}
        </View>
    )
}

export default ButtonGroupField
