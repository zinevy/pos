import React, { useContext, memo, useMemo } from "react"
import { View, ScrollView } from "react-native"

import { AppContext } from "../Main"
import withScreen from "../../utils/hoc/createScreen"

import { Text, LazyImage } from "../components/"
import { normalize } from "../../utils/scale"
import Items from "./Products/Items"

const Home = memo(() => {
    const { activeTheme, appState } = useContext(AppContext)

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
            </ScrollView>
        )
    }, [activeTheme, appState])
})

export default withScreen({ back: false })(Home)
