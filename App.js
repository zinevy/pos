import React from "react"
import { LogBox } from "react-native"
import codePush from "react-native-code-push"

import Main from "./src/Main"

LogBox.ignoreAllLogs()

let App = () => {
    return <Main />
}

let codePushOptions = {
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
    installMode: codePush.InstallMode.ON_NEXT_RESUME,
}
App = codePush(codePushOptions)(App)

export default App
