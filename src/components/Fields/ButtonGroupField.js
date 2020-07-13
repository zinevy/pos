import React, { useState, useCallback, memo, useRef, useEffect } from "react"
import { useField } from "formik"
import { View, CheckBox, StyleSheet } from "react-native"
import styled from "@emotion/native"
import { ButtonGroup } from "react-native-elements"

import { normalize } from "../../../utils/scale"
import Text from "../Text"

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
    },
})

const renderButtonField = (value) => {
    return <Text>{value.name}</Text>
}

const ButtonGroupField = ({ label, type, description, onSelect, options, ...props }) => {
    const [field, meta] = useField(props)
    const [selectedIndex, setSelectedIndex] = useState()

    const buttons = options.map((value) => {
        return {
            element: (param) => renderButtonField(value, param),
        }
    })

    const onButtonSelect = useCallback(
        (index) => {
            setSelectedIndex(index)
            onSelect(index)
        },
        [options, onSelect, setSelectedIndex]
    )

    return (
        <View style={{ marginBottom: normalize(10) }}>
            <View style={{ marginBottom: normalize(10) }}>
                {label && <Text>{label}</Text>}
                {description && <Text>{description}</Text>}
            </View>
            <ButtonGroup
                onPress={onButtonSelect}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={{ height: 100 }}
            />
            <View style={{ marginBottom: normalize(10) }}>
                {meta.touched && meta.error && <Text>{meta.error}</Text>}
            </View>
        </View>
    )
}

export default ButtonGroupField
