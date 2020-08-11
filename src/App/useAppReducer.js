import { useReducer, useEffect, useMemo } from "react"
import AsyncStorage from "@react-native-community/async-storage"

import reducer from "./reducer"
import appActions from "./actions"

const initialState = {
    isLoading: true,
    isSignout: false,
    isError: false,
    error: null,
    profile: null,
    device: {
        name: "",
        address: "",
        status: false,
    },
}

const useAppReducer = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        const bootstrapAsync = async () => {
            let response,
                values = {}

            try {
                response = await AsyncStorage.multiGet(["@token", "@key", "@profile"])

                for (let key of response) {
                    if (key[0]) {
                        values[key[0]] = key[1]
                    }
                }

                if (values["@profile"]) {
                    values["@profile"] = JSON.parse(values["@profile"])
                }
            } catch (e) {
                console.warn("e", e)
            } finally {
                dispatch({
                    type: "RESTORE_TOKEN",
                    token: values["@token"],
                    profile: values["@profile"],
                    key: values["@key"],
                })
                // SplashScreen.hide()
            }
        }

        bootstrapAsync()
    }, [])

    const actions = useMemo(() => appActions(dispatch), [])

    return [state, actions, dispatch]
}

export default useAppReducer
