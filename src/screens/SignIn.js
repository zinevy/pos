import React, { useContext, useCallback, memo, useEffect } from "react"
import { TouchableOpacity, SafeAreaView } from "react-native"
import styled from "@emotion/native"

import * as Facebook from "expo-facebook"
import * as Google from "expo-google-app-auth"

import Constants from "expo-constants"

import { AppContext } from "../Main"
import LoginForm from "../components/Forms/Login"
import withScreen from "../../utils/hoc/createScreen"

const Text = styled.Text(({ theme }) => ({
    color: theme.main.color,
}))

const SignInScreen = memo(({ navigation }) => {
    const { appState, actions, dispatch } = useContext(AppContext)
    const { FB_APP_ID, ANDROID_CLIENT_ID, IOS_CLIENT_ID } = Constants.manifest.extra

    useEffect(() => {
        const initFbSdk = async () => {
            try {
                await Facebook.initializeAsync(FB_APP_ID)
            } catch (error) {
                console.warn(error)
            }
        }

        dispatch({ type: "INIT" })
        initFbSdk()

        return () => {}
    }, [])

    const onSubmit = useCallback((values) => {
        actions.signIn(values)
    }, [])

    const signInWithFacebook = useCallback(async () => {
        try {
            const { type, token } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ["public_profile"],
            })
            if (type === "success") {
                fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
                    .then((response) => response.json())
                    .then((data) => {
                        actions.signInWithFacebook(data)
                    })
                    .catch((e) => console.log(e))
            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`)
        }
    }, [])

    const signInWithGoogle = useCallback(async () => {
        try {
            const result = await Google.logInAsync({
                iosClientId: IOS_CLIENT_ID,
                androidClientId: ANDROID_CLIENT_ID,
                scopes: ["profile", "email"],
            })

            if (result.type === "success") {
                actions.signInWithGoogle(result)

                return
            } else {
                return { cancelled: true }
            }
        } catch (e) {
            console.log("LoginScreen.js.js 30 | Error with login", e)
            return { error: true }
        }
    }, [])

    return (
        <SafeAreaView>
            <LoginForm
                onSubmit={onSubmit}
                error={appState.error}
                hasError={appState.isError}
                loading={appState.isLoading}
            />
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Registration")
                }}>
                <Text>Continue with Email</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={signInWithFacebook}>
                <Text>Continue with Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={signInWithGoogle}>
                <Text>Continue with Google</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
})

export default withScreen({ header: false })(SignInScreen)
