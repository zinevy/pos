/* eslint-disable no-console */
import React, { useState, useEffect, Fragment } from "react"
import { SplashScreen } from "expo"
import * as Font from "expo-font"
import { Ionicons } from "@expo/vector-icons"

import Main from "./src/Main"
import UpdateModal from "./src/components/UpdateModal"

const SpaceMono = require("./assets/fonts/SpaceMono-Regular.ttf")

const App = ({ skipLoadingScreen }) => {
    const [isLoadingComplete, setLoadingComplete] = useState(false)

    useEffect(() => {
        const loadResourcesAndDataAsync = async () => {
            try {
                SplashScreen.preventAutoHide()

                await Font.loadAsync({
                    ...Ionicons.font,
                    "space-mono": SpaceMono,
                })
            } catch (e) {
                // eslint-disable-next-line no-console
                console.warn(e)
            } finally {
                setLoadingComplete(true)
            }
        }

        loadResourcesAndDataAsync()

        return () => {}
    }, [])

    if (!isLoadingComplete && !skipLoadingScreen) {
        return null
    }

    return (
        <Fragment>
            <UpdateModal />
            <Main />
        </Fragment>
    )
}

export default App
