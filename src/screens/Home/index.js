import React, { useContext, memo, useMemo } from "react"
import { View } from "react-native"

import { AppContext } from "../../Main"
import withScreen from "../../../utils/hoc/createScreen"
import { Text } from "../../components"

const Sales = memo(() => {
    const { activeTheme, appState } = useContext(AppContext)

    return useMemo(() => {
        return (
            <View style={{ height: "100%", flex: 1, margin: 20 }}>
                <Text>Soon</Text>
            </View>
        )
    }, [activeTheme, appState])
})

export default withScreen({ back: false })(Sales)
