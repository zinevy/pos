import React from "react"
import { View, TouchableOpacity, KeyboardAvoidingView } from "react-native"
import { useTheme } from "emotion-theming"
import { Icon } from "react-native-elements"

import { Text } from "../../components"
import { normalize } from "../../../utils/scale"

const TabNavigation = ({ state, descriptors, navigation }) => {
    const theme = useTheme()
    const onPress = (route, isFocused) => {
        const event = navigation.emit({
            type: "tabPress",
            target: route.key,
        })

        if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
        }
    }

    const onLongPress = (route) => {
        navigation.emit({
            type: "tabLongPress",
            target: route.key,
        })
    }

    const renderTab = (route, index) => {
        const { options } = descriptors[route.key]
        let label = route.name

        if (options.title) {
            label = options.title
        }

        const isFocused = state.index === index

        return (
            <TouchableOpacity
                accessibilityLabel={options.tabBarAccessibilityLabel}
                accessibilityRole="button"
                accessibilityStates={isFocused ? ["selected"] : []}
                key={`tab-${index}`}
                onLongPress={() => onLongPress(route)}
                onPress={() => onPress(route, isFocused)}
                testID={options.tabBarTestID}
                style={{
                    display: "flex",
                    flexGrow: 1,
                    paddingTop: 20,
                    paddingBottom: 30,
                }}>
                <View
                    style={{
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                    }}>
                    <Icon
                        name={options.icon}
                        type="font-awesome-5"
                        color={isFocused ? theme.accent : theme.main.color}
                        size={18}
                    />
                    <Text
                        style={{
                            marginTop: 3,
                            fontSize: 7,
                            color: isFocused ? theme.accent : theme.main.color,
                            textTransform: "uppercase",
                            fontWeight: "bold",
                        }}>
                        {label}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <KeyboardAvoidingView
            style={{
                width: "100%",
                height: normalize(60),
                flexDirection: "row",
                backgroundColor: "#FFF",
            }}>
            {state.routes.map(renderTab)}
        </KeyboardAvoidingView>
    )
}

export default TabNavigation
