import React from "react"
import { useTheme } from "emotion-theming"
import { View } from "react-native"
import Text from "../Text"
import { CustomButton } from "../Button"

const ContextMenu = ({ options }) => {
    const theme = useTheme()
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "flex-end",
            }}>
            {!!options &&
                options.map((option, index) => {
                    return (
                        <View key={`options-${index}`} style={{ marginBottom: 10, marginRight: 5 }}>
                            <CustomButton
                                disabled={options.disabled}
                                buttonStyle={{
                                    height: 45,
                                    width: 90,
                                    borderRadius: theme.main.borderRadius,
                                    backgroundColor: option.secondary
                                        ? theme.buttons.secondary.backgroundColor
                                        : theme.accent,
                                }}
                                onPress={option.action}>
                                <Text
                                    style={{
                                        color: option.secondary ? theme.buttons.secondary.color : "#FFF",
                                        fontWeight: "bold",
                                        fontSize: 12,
                                        textTransform: "uppercase",
                                    }}>
                                    {option.label}
                                </Text>
                            </CustomButton>
                        </View>
                    )
                })}
        </View>
    )
}

export default ContextMenu
