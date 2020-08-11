import React, { useContext, memo, useMemo } from "react"
import { View } from "react-native"

import { AppContext } from "../Main"
import withScreen from "../../utils/hoc/createScreen"
import SalesItems from "./Sales/Products"

const Sales = memo(() => {
    const { activeTheme, appState } = useContext(AppContext)

    return useMemo(() => {
        return (
            <View style={{ height: "100%", flex: 1 }}>
                <SalesItems />
            </View>
        )
    }, [activeTheme, appState])
})

export default withScreen({ back: false })(Sales)
