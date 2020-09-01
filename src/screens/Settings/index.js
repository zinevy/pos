import React, { useContext, memo } from "react"
import { View, TouchableOpacity } from "react-native"
import { ListItem } from "react-native-elements"
import codePush from "react-native-code-push"

import withScreen from "../../../utils/hoc/createScreen"
import { AppContext } from "../../Main"
import Text from "../../components/Text"
import { VERSION } from "../../../env.json"

const Settings = memo(({ navigation }) => {
    const { appState, actions } = useContext(AppContext)

    const onButtonPress = () => {
        codePush.sync({
            updateDialog: true,
            installMode: codePush.InstallMode.IMMEDIATE,
        })
    }

    return (
        <View style={{ flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
            <View>
                {appState.profile && (
                    <ListItem
                        title={appState.profile.first_name}
                        subtitle={appState.profile.branch.name}
                        bottomDivider
                    />
                )}
                <ListItem
                    title={`Printer ${appState.device.name ? `(${appState.device.name})` : ""}`}
                    bottomDivider
                    onPress={() => navigation.navigate("BluetoothDevices")}
                />
                <ListItem title="Sign out" onPress={() => actions.signOut()} />
            </View>

            <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
                <View>
                    <TouchableOpacity onPress={onButtonPress}>
                        <Text style={{ fontWeight: "bold" }}>Check for updates</Text>
                    </TouchableOpacity>
                </View>
                <Text>{VERSION}</Text>
            </View>
        </View>
    )
})

export default withScreen({ cart: false, back: false })(Settings)
