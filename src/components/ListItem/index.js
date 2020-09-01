import React from "react"
import { useTheme } from "emotion-theming"
import { View, Pressable } from "react-native"

import Text from "../Text"

const ListItem = ({
    leftTitleText,
    leftSubTitleText,
    rightTitleText,
    rightSubTitleText,
    onPress,
    onLongPress,
    listItemStyle,
}) => {
    const theme = useTheme()
    return (
        <View
            style={{
                position: "relative",
                width: "100%",
                ...listItemStyle,
            }}>
            <View
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 10,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 2,
                    borderRadius: theme.main.borderRadius,
                    backgroundColor: "#FFF",
                    marginLeft: 3,
                    marginRight: 3,
                }}>
                <Pressable
                    style={{
                        padding: 20,
                        minHeight: 60,
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                    onLongPress={onLongPress}
                    onPress={onPress}>
                    <View style={{ alignItems: "flex-start" }}>
                        {typeof leftTitleText === "function" && (
                            <Text
                                style={{
                                    fontSize: 15,
                                    color: "#585858",
                                }}>
                                {leftTitleText()}
                            </Text>
                        )}
                        {typeof leftTitleText === "string" && (
                            <Text
                                style={{
                                    fontSize: 15,
                                    color: "#585858",
                                }}>
                                {leftTitleText}
                            </Text>
                        )}
                        {typeof leftSubTitleText === "function" ? leftSubTitleText() : null}
                        {typeof leftSubTitleText === "string" ? (
                            <Text
                                style={{
                                    fontSize: 10,
                                    color: "#9a9a9a",
                                }}>
                                {leftSubTitleText.toString()}
                            </Text>
                        ) : null}
                    </View>
                    <View style={{ alignItems: "flex-end" }}>
                        {typeof rightTitleText === "function" ? rightTitleText() : null}
                        {typeof rightTitleText === "string" ? (
                            <Text
                                style={{
                                    fontSize: 15,
                                    color: "#585858",
                                    textAlign: "right",
                                }}>
                                {rightTitleText}
                            </Text>
                        ) : null}
                        {typeof rightSubTitleText === "function" ? rightSubTitleText() : null}
                        {typeof rightSubTitleText === "string" ? (
                            <Text style={{ color: "#585858", fontSize: 11 }}>{rightSubTitleText}</Text>
                        ) : null}
                    </View>
                </Pressable>
            </View>
        </View>
    )
}

export default ListItem
