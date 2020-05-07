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
                            ["@key", JSON.stringify(userData.id)],
                        ]
                        await AsyncStorage.multiSet(keys)
                    } catch (error) {
                        console.warn(error)
                        // Restoring token failed
                    } finally {
                        dispatch({ type: "SIGN_IN_SUCCESS", token, profile: userData, key: userData.id })
                    }
                } catch (error) {
                    console.warn(error)
                    // throw err
                }
            } else {
                dispatch({ type: "SIGN_IN_ERROR", error: signInRes.data.error })
            }
        } catch (error) {
            console.warn(error)
            // throw error
        }
    }

    const signInWithFacebook = async (data) => {
        dispatch({ type: "REQUEST_SIGN_IN" })

        try {
            if (data.id) {
                try {
                    const token = data.id
                    const userData = {
                        id: data.id,
                        first_name: data.name,
                        name: data.name,
                        image_url: data.picture.data.url,
                    }

                    try {
                        const keys = [
                            ["@profile", JSON.stringify(userData)],
                            ["@token", token],
                            ["@key", userData.id],
                        ]
                        await AsyncStorage.multiSet(keys)
                    } catch (e) {
                        // Restoring token failed
                    } finally {
                        dispatch({ type: "SIGN_IN_SUCCESS", token, profile: userData, key: userData.id })
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

    const signInWithGoogle = async (data) => {
        dispatch({ type: "REQUEST_SIGN_IN" })

        try {
            if (data.type === "success" && data.accessToken) {
                try {
                    const token = data.accessToken
                    const userData = {
                        id: data.user.id,
                        first_name: data.user.name,
                        name: data.user.name,
                        email: data.user.email,
                        image_url: data.user.photoUrl,
                    }

                    try {
                        const keys = [
                            ["@profile", JSON.stringify(userData)],
                            ["@token", token],
                            ["@key", userData.id],
                        ]
                        await AsyncStorage.multiSet(keys)
                    } catch (e) {
                        // Restoring token failed
                    } finally {
                        dispatch({ type: "SIGN_IN_SUCCESS", token, profile: userData, key: userData.id })
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

                console.log("USERDATA", userData)

                try {
                    const keys = [
                        ["@profile", JSON.stringify(userData)],
                        ["@token", JSON.stringify(token)],
                        ["@key", JSON.stringify(userData.id)],
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
            throw error
        }
    }

    return {
        signIn,
        signInWithFacebook,
        signInWithGoogle,
        signOut,
        register,
    }
}

export default actions
