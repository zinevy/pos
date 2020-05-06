import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "emotion-theming"

const TabBar = ({ state, descriptors, navigation }) => {
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
                    {/* <Text style={{ color: theme.main.color }}>Icon</Text> */}
                    <Text style={{ color: isFocused ? "#673ab7" : theme.main.color }}>{label}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View
            style={{
                // position: "absolute",
                // left: 0,
                // right: 0,
                // bottom: 0,
                // display: "flex",
                flexDirection: "row",
                backgroundColor: theme.main.backgroundColor,
            }}>
            {state.routes.map(renderTab)}
        </View>
    )
}

export default TabBar
