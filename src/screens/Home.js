import React, { Suspense, useContext, memo, useMemo } from "react"
import { View, TouchableOpacity, ScrollView } from "react-native"
import styled from "@emotion/native"
import * as Updates from "expo-updates"

import { AppContext } from "../Main"
import withScreen from "../../utils/hoc/createScreen"

import { Text, LazyImage } from "../components/"
import { normalize } from "../../utils/scale"
import Items from "./Products/Items"

const Home = memo(() => {
    const { activeTheme, actions, appState } = useContext(AppContext)

    return useMemo(() => {
        return (
            <ScrollView style={{ marginTop: normalize(20) }}>
                {appState.profile && (
                    <View
                        style={{
                            marginBottom: 20,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                        <LazyImage
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 50,
                            }}
                            source={{ uri: appState.profile.image_url }}
                        />
                        <Text style={{ marginLeft: 10, fontWeight: "bold" }}>
                            {appState.profile.first_name} {appState.profile.last_name}
                        </Text>
                    </View>
                )}

                <Items />
                <View style={{ marginTop: 60, justifyContent: "center", alignItems: "center" }}>
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
            </ScrollView>
        )
    }, [activeTheme, appState])
})

export default withScreen({ back: false })(Home)
