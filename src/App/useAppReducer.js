import { useReducer, useEffect, useMemo } from "react"
import { AsyncStorage } from "react-native"
import Constants from "expo-constants"
import { SplashScreen } from "expo"

import { requests } from "../../utils/httpClient"
import Storage from "../../utils/Storage"

import appReducer from "./reducer"

const useAppReducer = () => {
    const SECRET_KEY = Constants.manifest.extra.APP_SECRET_KEY
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
                    console.log(values["@profile"])
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

    const authContext = useMemo(
        () => ({
            signIn: async (data) => {
                dispatch({ type: "REQUEST_SIGN_IN" })

                try {
                    const signInRes = await requests.post("/login", data)

                    if (signInRes.ok) {
                        // get user details
                        try {
                            const userRes = await requests.get("/users/2")
                            const token = signInRes.data.token
                            const userData = userRes.data.data

                            try {
                                const keys = [
                                    ["@profile", JSON.stringify(userData)],
                                    ["@token", token],
                                ]
                                await AsyncStorage.multiSet(keys)
                            } catch (e) {
                                // Restoring token failed
                            } finally {
                                dispatch({ type: "SIGN_IN_SUCCESS", token, profile: userData })
                            }
                        } catch (err) {
                            throw err
                        }
                    } else {
                        dispatch({ type: "SIGN_IN_ERROR", error: signInRes.data.error })
                    }
                } catch (error) {
                    throw error
                }
            },
            signOut: async () => {
                try {
                    let keys = ["@token", "@profile"]

                    await AsyncStorage.multiRemove(keys)
                } catch (e) {
                    // Restoring token failed
                } finally {
                    dispatch({ type: "SIGN_OUT" })
                }
            },
            register: async (data) => {
                dispatch({ type: "REQUEST_REGISTER" })

                try {
                    const res = await requests.post("/register", data)

                    if (res.ok) {
                        const userToken = res.data.token
                        try {
                            await AsyncStorage.setItem("@token", userToken)
                        } catch (e) {
                            // Restoring token failed
                        } finally {
                            dispatch({ type: "REGISTER_SUCCESS", token: userToken })
                        }
                    } else {
                        dispatch({ type: "REGISTER_ERROR", error: res.data.error })
                    }
                } catch (error) {
                    throw error
                }
            },
        }),
        []
    )

    return [state, authContext, dispatch]
}

export default useAppReducer
