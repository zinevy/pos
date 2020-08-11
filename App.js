import React from "react"
import { LogBox } from "react-native"
import Main from "./src/Main"

LogBox.ignoreAllLogs()

const App = () => {
    console.log("test")
    return <Main />
}

export default App
