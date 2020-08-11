import React from "react"
import { View } from "react-native"
import styled from "@emotion/native"

import { normalize } from "../../../utils/scale"
import { PrimaryButton } from "../Button"
import Text from "../Text"

const FieldGroup = styled(View)(({ theme, disabled }) => ({
    borderColor: "#EEE",
    flexDirection: "row",
    marginTop: normalize(5),
    backgroundColor: disabled ? "#CCC" : "#4AB577",
    height: theme.button.height,
    borderRadius: normalize(8),
    flexDirection: "row",
    flexWrap: "wrap",
    position: "relative",
    justifyContent: "space-between",
    overflow: "hidden",
}))

const Stepper = ({
    value,
    onDecrement,
    onIncrement,
    title,
    subtitle,
    decrementDisabled,
    incrementDisabled,
    disabled,
}) => {
    return (
        <FieldGroup disabled={disabled || value === 0}>
            <View style={{ width: "20%" }}>
                <PrimaryButton
                    buttonStyle={{ width: "100%", backgroundColor: "transparent" }}
                    containerStyle={{ alignItems: "center" }}
                    textStyle={{ fontSize: normalize(20) }}
                    disabled={decrementDisabled}
                    onPress={onDecrement}
                    title="-"
                />
            </View>
            <View
                style={{
                    flexGrow: 1,
                    alignItems: subtitle ? "flex-start" : "center",
                    justifyContent: "center",
                }}>
                <Text maxLength={5} bold style={{ fontSize: subtitle ? normalize(11) : normalize(14), color: "#FFF" }}>
                    {title}
                </Text>
                {subtitle && (
                    <Text maxLength={5} style={{ fontSize: normalize(10), color: "#FFF" }}>
                        {subtitle}
                    </Text>
                )}
            </View>
            <View style={{ width: "20%" }}>
                <PrimaryButton
                    buttonStyle={{ width: "100%", backgroundColor: "transparent" }}
                    containerStyle={{ alignItems: "center" }}
                    textStyle={{ fontSize: normalize(20) }}
                    disabled={incrementDisabled}
                    onPress={onIncrement}
                    title="+"
                />
            </View>
        </FieldGroup>
    )
}

export default Stepper
