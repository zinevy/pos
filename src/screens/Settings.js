import React, { useContext, memo } from "react"
import { View, TouchableOpacity } from "react-native"
import styled from "@emotion/native"
import * as Updates from "expo-updates"

import withScreen from "../../utils/hoc/createScreen"
import { AppContext } from "../Main"
import Button from "../components/Button"
import { normalize } from "../../utils/scale"
import { LazyImage } from "../components"

const Text = styled.Text(({ theme }) => ({
    color: theme.main.color,
}))

const Settings = memo(() => {
    const { appState, actions, activeTheme, toggleTheme } = useContext(AppContext)

    return (
        <View style={{ marginTop: normalize(20) }}>
            {appState.profile && (
                <View
                    style={{
                        marginBottom: 20,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                    <Text style={{ marginLeft: 10, fontWeight: "bold" }}>
                        {appState.profile.first_name} {appState.profile.last_name}
                    </Text>
                </View>
            )}
            <Button title={activeTheme === "light" ? "Dark Mode" : "Light Mode"} onPress={toggleTheme} />
            <View style={{ marginTop: normalize(50), justifyContent: "center", alignItems: "center" }}>
                {appState.userToken && (
                    <TouchableOpacity
                        onPress={() => {
                            actions.signOut()
                        }}>
                        <Text>Sign out</Text>
                    </TouchableOpacity>
                )}
                <Text>{Updates.manifest.version}</Text>
            </View>
        </View>
    )
})

export default withScreen({ cart: false, back: false })(Settings)
