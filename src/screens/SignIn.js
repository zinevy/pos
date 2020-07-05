import React, { Fragment, useContext, useCallback, memo, useEffect } from "react"
import { View, SafeAreaView } from "react-native"
import styled from "@emotion/native"
import * as Updates from "expo-updates"
import * as Facebook from "expo-facebook"
import * as Google from "expo-google-app-auth"

import Constants from "expo-constants"
import { normalize } from "../../utils/scale"

import { AppContext } from "../Main"
import LoginForm from "../components/Forms/Login"
import withScreen from "../../utils/hoc/createScreen"
import Button from "../components/Button"
import device from "../../utils/device"

import { Text } from "../components"

const LoginButton = styled.TouchableOpacity({
    backgroundColor: "#000",
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 10,
    touchAction: "none",
})

const Divider = styled(View)(({ theme }) => ({
    position: "absolute",
    width: "100%",
    height: 1,
    backgroundColor: theme.main.color,
    left: 0,
    top: " 50%",
}))

const DividerText = styled(Text)(({ theme }) => ({
    backgroundColor: theme.main.backgroundColor,
    zIndex: 9,
    paddingLeft: 10,
    paddingRight: 10,
}))

const LoginText = styled(Text)({
    padding: 15,
    color: "#FFF",
    textAlign: "center",
})

const SignInScreen = memo(({ navigation }) => {
    const { appState, actions, dispatch } = useContext(AppContext)
    const {
        FB_APP_ID,
        ANDROID_CLIENT_ID,
        ANDROID_CLIENT_ID_EXPO,
        IOS_CLIENT_ID,
        IOS_CLIENT_ID_EXPO,
    } = Constants.manifest.extra
    const { client, isLoading, isProcessing, isError } = appState

    useEffect(() => {
        if (device(["ios", "android"])) {
            const initFbSdk = async () => {
                try {
                    await Facebook.initializeAsync(FB_APP_ID)
                } catch (error) {
                    console.warn(error)
                }
            }

            initFbSdk()
        }

        dispatch({ type: "INIT" })

        return () => {}
    }, [])

    const signIn = useCallback((values) => {
        actions.signIn(values)
    }, [])

    const signInWithFacebook = useCallback(async () => {
        try {
            actions.requestSignIn({ client: "facebook" })
            const { type, token } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ["public_profile"],
            })
            if (type === "success") {
                actions.requestProcessing()
                fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
                    .then((response) => response.json())
                    .then((data) => {
                        actions.signInWithFacebook(data)
                    })
                    .catch((e) => {
                        actions.signInError("Login error")
                    })
            } else {
                // type === 'cancel'
                actions.init()
            }
        } catch ({ message }) {
            actions.signInError(`Facebook Login Error: ${message}`)
        }
    }, [])

    const signInWithGoogle = useCallback(async () => {
        try {
            actions.requestSignIn({ client: "google" })
            const result = await Google.logInAsync({
                iosClientId: IOS_CLIENT_ID_EXPO,
                androidClientId: ANDROID_CLIENT_ID_EXPO,
                androidStandaloneAppClientId: ANDROID_CLIENT_ID,
                iosStandaloneAppClientId: IOS_CLIENT_ID,
                scopes: ["profile", "email"],
            })

            actions.requestProcessing()

            if (result.type === "success") {
                actions.signInWithGoogle(result)
            } else {
                console.log("CANCELLED")
                // Cancelled
                actions.init()
            }
        } catch (e) {
            actions.init()
            console.log("Error with login", e)
        }
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center", margin: normalize(20) }}>
            {!appState.userToken && (
                <Fragment>
                    <View style={{ maxWidth: "50%", alignSelf: "center" }}>
                        <View style={{ alignItems: "center", marginBottom: normalize(10) }}>
                            <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: normalize(20) }}>Login</Text>
                            <Text style={{ fontSize: 15, marginBottom: normalize(20) }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                            </Text>
                        </View>
                        <LoginForm
                            onSubmit={signIn}
                            error={appState.error}
                            hasError={isError}
                            disabled={isLoading}
                            loading={isLoading && client === "email"}
                            processing={isProcessing}
                        />
                        {device(["android", "ios"]) && (
                            <View style={{ alignItems: "center", marginTop: 10 }}>
                                <Text style={{ fontSize: 13 }}>v{Updates.manifest.version}</Text>
                            </View>
                        )}
                    </View>
                </Fragment>
            )}
        </SafeAreaView>
    )
})

export default withScreen({ header: false })(SignInScreen)
