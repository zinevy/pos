import { AsyncStorage } from "react-native"

import { requests } from "../../utils/httpClient"

const actions = (dispatch) => {
    const signIn = async (data) => {
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
    }

    const fbSignIn = async (data) => {
        dispatch({ type: "REQUEST_SIGN_IN" })

        try {
            if (data.id) {
                try {
                    const token = data.id
                    const userData = {
                        first_name: data.name,
                        image_url: data.picture.data.url,
                    }

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
    }

    const signOut = async () => {
        try {
            let keys = ["@token", "@profile"]

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
    }

    return {
        signIn,
        fbSignIn,
        signOut,
        register,
    }
}

export default actions
