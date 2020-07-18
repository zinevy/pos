import React, { useCallback, useEffect, useRef } from "react"
import { useField } from "formik"
import { View } from "react-native"
import styled from "@emotion/native"
import { ButtonGroup } from "react-native-elements"

import { normalize } from "../../../utils/scale"

const Text = styled.Text(({ theme }) => ({
    color: theme.main.color,
}))

const TextButton = styled.Text(({ theme }) => ({
    color: theme.button.color,
}))

const renderButtonField = (value) => {
    return <TextButton>{value.name}</TextButton>
}

const ButtonGroupField = ({
    label,
    type,
    description,
    item,
    initialValues,
    selectMultiple,
    onSelect,
    options,
    ...props
}) => {
    const [field, meta] = useField(props)

    const buttons = options.map((value) => ({
        element: (param) => renderButtonField(value, param),
    }))

    const onButtonSelect = useCallback(
        (index) => {
            onSelect(index)
        },
        [options, onSelect]
    )

    return (
        <View style={{ marginBottom: normalize(10), width: "100%" }}>
            <View style={{ marginBottom: normalize(10) }}>
                {label && <Text>{label}</Text>}
                {description && <Text>{description}</Text>}
            </View>
            <ButtonGroup buttons={buttons} onPress={onButtonSelect} selectedIndex={props.value} />
            <View style={{ marginBottom: normalize(10) }}>
                {meta.touched && meta.error && <Text>{meta.error}</Text>}
            </View>
        </View>
    )
}

export default ButtonGroupField
