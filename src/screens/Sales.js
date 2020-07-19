import React, { useContext, memo, useMemo } from "react"
import { View, ScrollView } from "react-native"

import { AppContext } from "../Main"
import withScreen from "../../utils/hoc/createScreen"

import { normalize } from "../../utils/scale"
import SalesItems from "./Sales/Products"

const Sales = memo(() => {
    const { activeTheme, appState } = useContext(AppContext)

    return useMemo(() => {
        return (
            <View style={{ marginTop: normalize(20), height: "100%" }}>
                <SalesItems />
            </View>
        )
    }, [activeTheme, appState])
})

export default withScreen({ back: false })(Sales)
