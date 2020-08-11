import AsyncStorage from "@react-native-community/async-storage"
import md5 from "md5"

import { requests } from "../../utils/httpClient"

const actions = (dispatch) => {
    const init = () => {
        return dispatch({ type: "INIT" })
    }

    const requestSignIn = ({ client }) => {
        return dispatch({ type: "REQUEST_SIGN_IN", client })
    }

    const requestProcessing = () => {
        return dispatch({ type: "REQUEST_PROCESSING" })
    }

    const signInError = (error) => {
        console.log("ERROR", error)
        return dispatch({ type: "SIGN_IN_ERROR", error })
    }

    const signIn = async (data) => {
        try {
            dispatch({ type: "REQUEST_SIGN_IN", client: "email" })
            const signInRes = await requests.authorize("/login", data)

            if (signInRes.ok) {
                // get user details
                try {
                    const token = signInRes.data.success.token

                    try {
                        await AsyncStorage.setItem("@token", token)

                        const userRes = await requests.get("/me")
                        const { id, name, email, branch } = userRes.data.success

                        const userData = {
                            id,
                            first_name: name,
                            name,
                            email,
                            branch,
                        }

                        const key = md5(userData.id)

                        console.log("@key", key)

                        const keys = [
                            ["@profile", JSON.stringify(userData)],
                            ["@key", key],
                        ]

                        await AsyncStorage.multiSet(keys)

                        dispatch({ type: "SIGN_IN_SUCCESS", token, profile: userData, key })
                    } catch (error) {
                        console.warn(error)
                    }
                } catch (error) {
                    console.warn(error)
                }
            } else {
                let error = "Error"

                if (signInRes.data && signInRes.data.error === "Unauthorised") {
                    error = "email or password is incorrect"
                }

                console.log("signInRes", signInRes)
                dispatch({ type: "SIGN_IN_ERROR", error: signInRes.problem })
            }
        } catch (error) {
            console.warn(error)
            dispatch({ type: "SIGN_IN_ERROR", error })
        }
    }

    const signOut = async () => {
        try {
            let keys = ["@token", "@profile", "@key"]

            await AsyncStorage.multiRemove(keys)
        } catch (e) {
            // Restoring token failed
        } finally {
            dispatch({ type: "SIGN_OUT" })
        }
    }

    const register = async (data) => {
        dispatch({ type: "REQUEST_REGISTER" })

        try {
            const res = await requests.post("/register", data)

            if (res.ok) {
                const userRes = await requests.get("/users/2")
                const token = res.data.token
                const { id, first_name, avatar, email } = userRes.data.data
                const userData = {
                    id,
                    first_name,
                    name: first_name,
                    email,
                    image_url: avatar,
                }

                try {
                    const keys = [
                        ["@profile", JSON.stringify(userData)],
                        ["@token", JSON.stringify(token)],
                        ["@key", md5(userData.id)],
                    ]
                    await AsyncStorage.multiSet(keys)
                } catch (error) {
                    console.warn(error)
                } finally {
                    dispatch({ type: "REGISTER_SUCCESS", token, profile: userData, key: userData.id })
                }
            } else {
                dispatch({ type: "REGISTER_ERROR", error: res.data.error })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const setPrinterSettings = ({ name, address, status }) => {
        return dispatch({ type: "SET_PRINTER_SETTINGS", name, address, status })
    }

    return {
        init,
        requestSignIn,
        signIn,
        signInError,
        setPrinterSettings,
        requestProcessing,
        signOut,
        register,
    }
}

export default actions
