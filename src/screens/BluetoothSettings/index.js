import React, { useContext, memo } from "react"
import { View } from "react-native"

import withScreen from "../../../utils/hoc/createScreen"
import { AppContext } from "../../Main"
import { normalize } from "../../../utils/scale"
import BluetoothSettings from "./Settings"

const BluetoothSettingsScreen = memo(({ navigation }) => {
    const { appState, actions } = useContext(AppContext)

    return (
        <View style={{ marginTop: normalize(20) }}>
            <View>
                <BluetoothSettings printer={appState.device} setPrinterSettings={actions.setPrinterSettings} />
            </View>
        </View>
    )
})

export default withScreen({ cart: false, back: true })(BluetoothSettingsScreen)
