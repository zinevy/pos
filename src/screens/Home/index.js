import React, { useContext, memo, useMemo, Suspense } from "react"
import { View, ScrollView } from "react-native"

import { AppContext } from "../../Main"
import withScreen from "../../../utils/hoc/createScreen"
import Transactions from "./Transactions"
import { Text } from "../../components"

const Sales = memo(() => {
    const { activeTheme, appState } = useContext(AppContext)

    return useMemo(() => {
        return (
            <View style={{ height: "100%", flex: 1, margin: 20 }}>
                {/* <Transactions branchId={appState.profile.branch.id} /> */}
                <Text>Soon</Text>
            </View>
        )
    }, [activeTheme, appState])
})

export default withScreen({ back: false })(Sales)
