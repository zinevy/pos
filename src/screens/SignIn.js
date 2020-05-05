import React, { useContext, useCallback, memo, useEffect } from "react"
import { TouchableOpacity, SafeAreaView } from "react-native"
import styled from "@emotion/native"
import * as Facebook from "expo-facebook"
import Constants from "expo-constants"

import { AppContext } from "../Main"
import LoginForm from "../components/Forms/Login"
import withScreen from "../../utils/hoc/createScreen"

const Text = styled.Text(({ theme }) => ({
    color: theme.main.color,
}))

const SignInScreen = memo(({ navigation }) => {
    const { appState, authContext, dispatch } = useContext(AppContext)
    const { FB_APP_ID } = Constants.manifest.extra

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
        authContext.signIn(values)
    }, [])

    const facebookLogIn = useCallback(async () => {
        try {
            const { type, token } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ["public_profile"],
            })
            if (type === "success") {
                fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
                    .then((response) => response.json())
                    .then((data) => {
                        authContext.fbSignIn(data)
                    })
                    .catch((e) => console.log(e))
            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`)
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
                <Text>Register here</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={facebookLogIn}>
                <Text>Login using facebook</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
})

export default withScreen({ header: false })(SignInScreen)
