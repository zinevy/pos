import { AsyncStorage } from "react-native"

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
            console.log("SUCCESS", signInRes)

            if (signInRes.ok) {
                // get user details
                try {
                    const token = signInRes.data.success.token

                    try {
                        console.log("TOKEN", token)
                        // const keys = [["@token", JSON.stringify(token)]]
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

                        const keys = [
                            ["@profile", JSON.stringify(userData)],
                            ["@key", JSON.stringify(userData.id)],
                        ]

                        await AsyncStorage.multiSet(keys)

                        dispatch({ type: "SIGN_IN_SUCCESS", token, profile: userData, key: userData.id })
                    } catch (error) {
                        console.warn(error)
                    }
                } catch (error) {
                    console.warn(error)
                    // console.log(err)
                }
            } else {
                let error = "Error"

                if (signInRes.data && signInRes.data.error === "Unauthorised") {
                    error = "email or password is incorrect"
                }

                console.log("signInRes", signInRes)
                dispatch({ type: "SIGN_IN_ERROR", error })
            }
        } catch (error) {
            console.warn(error)
            dispatch({ type: "SIGN_IN_ERROR", error })
        }
    }

    const signInWithFacebook = async (data) => {
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
                    console.log(err)
                }
            } else {
                dispatch({ type: "SIGN_IN_ERROR", error: signInRes.data.error })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const signInWithGoogle = async (data) => {
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
                    console.log(err)
                }
            } else {
                dispatch({ type: "SIGN_IN_ERROR", error: signInRes.data.error })
            }
        } catch (error) {
            console.log(error)
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
            console.log(error)
        }
    }

    return {
        init,
        requestSignIn,
        signIn,
        signInError,
        signInWithFacebook,
        signInWithGoogle,
        requestProcessing,
        signOut,
        register,
    }
}

export default actions
