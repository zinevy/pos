import { useReducer, useEffect, useMemo } from "react"
import { AsyncStorage } from "react-native"
import { SplashScreen } from "expo"

import appReducer from "./reducer"
import appActions from "./actions"

const useAppReducer = () => {
    const [state, dispatch] = useReducer(appReducer, {
        isLoading: true,
        isSignout: false,
        isError: false,
        error: null,
        profile: null,
    })

    useEffect(() => {
        const bootstrapAsync = async () => {
            let response
            let values = {}

            try {
                response = await AsyncStorage.multiGet(["@token", "@profile"])

                for (let key of response) {
                    if (key[0]) {
                        values[key[0]] = key[1]
                    }
                }

                if (values["@profile"]) {
                    // values["@profile"] = JSON.parse(Storage.decrypt(values["@profile"], SECRET_KEY))
                    values["@profile"] = JSON.parse(values["@profile"])
                }
            } catch (e) {
                console.warn("e", e)
            } finally {
                dispatch({
                    type: "RESTORE_TOKEN",
                    token: values["@token"],
                    profile: values["@profile"],
                })
                SplashScreen.hide()
            }
        }

        bootstrapAsync()
    }, [])

    const actions = useMemo(() => appActions(dispatch), [])

    return [state, actions, dispatch]
}

export default useAppReducer
