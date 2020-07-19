import { useState, useEffect, useCallback, useMemo } from "react"
import * as Updates from "expo-updates"
import { AppState, AsyncStorage } from "react-native"

const useUpdates = () => {
    const [state, setState] = useState({
        update: false,
        checking: false,
        manifest: { ...Updates.manifest },
        isModalVisible: false,
    })
    const [checkingUpdates, setCheckingUpdates] = useState(false)

    // useEffect(() => {
    //     setTimeout(() => {
    //         setState({
    //             ...state,
    //             isModalVisible: true,
    //         })
    //     }, 1000)
    // }, [])

    useEffect(() => {
        AppState.addEventListener("change", handleAppStateChange)
        checkUpdates()

        return () => {
            AppState.removeEventListener("change", handleAppStateChange)
        }
    }, [])

    const checkUpdates = useCallback(async () => {
        if (!checkingUpdates) {
            console.log("Checking for existing token...")
            const token = await AsyncStorage.getItem("@token")

            if (token) {
                setCheckingUpdates(true)
                try {
                    const update = await Updates.checkForUpdateAsync()

                    if (update.isAvailable && token) {
                        console.log("An update was found, downloading...")
                        await Updates.fetchUpdateAsync()

                        setState((prevState) => ({
                            ...prevState,
                            manifest: update.manifest,
                            isModalVisible: true,
                        }))
                    } else {
                        console.log("No updates were found")
                    }
                } catch (e) {
                    console.log("Error while trying to check for updates", e)
                }
            } else {
                console.log("Token does not exists")
            }

            setCheckingUpdates(false)
        } else {
            console.log("Currently checking for an update")
        }
    }, [checkingUpdates])

    const handleAppStateChange = (nextAppState) => {
        console.log("status:", nextAppState)
        if (nextAppState === "active") {
            checkUpdates()
        }
    }

    return useMemo(
        () => ({
            isModalVisible: state.isModalVisible,
            manifest: state.manifest,
            update: state.update,
            state,
            setUpdate: setState,
        }),
        [state.isModalVisible, state.manifest, state.update]
    )
}

export default useUpdates
