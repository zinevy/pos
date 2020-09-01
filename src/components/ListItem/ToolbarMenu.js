import React, { Fragment } from "react"
import { View, TouchableOpacity } from "react-native"
import { useTheme } from "emotion-theming"

import Text from "../Text"
import { CustomButton } from "../Button"
import { Icon } from "react-native-elements"

const ToolbarMenu = ({ options }) => {
    const theme = useTheme()
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
                marginLeft: 6,
                marginRight: 6,
            }}>
            {!!options &&
                options.map((option, index) => {
                    if (option.static) {
                        if (typeof option.title !== "function") return null
                        return <Fragment key={`toolbar-${index}`}>{option.title()}</Fragment>
                    }

                    if (option.filter) {
                        return (
                            <TouchableOpacity key={`toolbar-${index}`} onPress={option.action}>
                                <Icon name="ellipsis-v" type="font-awesome-5" solid size={13} />
                            </TouchableOpacity>
                        )
                    }

                    return (
                        <View key={`toolbar-${index}`} style={{ alignItems: "center", justifyContent: "center" }}>
                            <CustomButton
                                buttonStyle={{
                                    height: 40,
                                    width: option.width,
                                    borderRadius: theme.main.borderRadius,
                                }}
                                onPress={option.action}>
                                <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 11 }}>
                                    {typeof option.label === "function" && option.label()}
                                    {typeof option.label === "string" && option.label}
                                </Text>
                            </CustomButton>
                        </View>
                    )
                })}
        </View>
    )
}

export default ToolbarMenu
