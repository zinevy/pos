import React, { Fragment, useContext, useCallback, memo, useEffect } from "react"
import { View, SafeAreaView } from "react-native"
import styled from "@emotion/native"
import * as Updates from "expo-updates"
import * as Facebook from "expo-facebook"
import * as Google from "expo-google-app-auth"

import Constants from "expo-constants"

import { AppContext } from "../Main"
import LoginForm from "../components/Forms/Login"
import withScreen from "../../utils/hoc/createScreen"
import Button from "../components/Button"
import device from "../../utils/device"

const Text = styled.Text(({ theme }) => ({
    color: theme.main.color,
}))

const LoginButton = styled.TouchableOpacity({
    backgroundColor: "#000",
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 10,
    touchAction: "none",
})

const Divider = styled(View)(({ theme }) => ({
    content: `''`,
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

    const signIn = useCallback((values) => {
        actions.requestSignIn({ client: "email" })
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
        <SafeAreaView style={{ flex: 1, justifyContent: "center", margin: 20 }}>
            {!appState.userToken && (
                <Fragment>
                    <View>
                        <View style={{ alignItems: "center", marginBottom: 10 }}>
                            <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 10 }}>Login</Text>
                            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
                        </View>
                        <LoginForm
                            onSubmit={signIn}
                            error={appState.error}
                            hasError={isError}
                            disabled={isLoading}
                            loading={isLoading && client === "email"}
                            processing={isProcessing}
                        />
                        <View
                            style={{
                                alignItems: "center",
                                marginLeft: 10,
                                marginRight: 10,
                                marginTop: 20,
                                marginBottom: 20,
                                position: "relative",
                            }}>
                            <Divider />
                            <DividerText>OR</DividerText>
                        </View>
                        <Button
                            disabled={isLoading}
                            title="Continue with Email"
                            onPress={() => navigation.navigate("Registration")}
                        />
                        {device(["android", "ios"]) && (
                            <Fragment>
                                <Button
                                    disabled={isLoading}
                                    title="Continue with Facebook"
                                    processing={isProcessing}
                                    loading={isLoading && client === "facebook"}
                                    onPress={signInWithFacebook}
                                />
                                <Button
                                    disabled={isLoading}
                                    title="Continue with Google"
                                    loading={isLoading && client === "google"}
                                    processing={isProcessing}
                                    onPress={signInWithGoogle}
                                />
                            </Fragment>
                        )}
                    </View>
                    {device(["android", "ios"]) && (
                        <View style={{ alignItems: "center", marginTop: 10 }}>
                            <Text style={{ fontSize: 13 }}>v{Updates.manifest.version}</Text>
                        </View>
                    )}
                </Fragment>
            )}
        </SafeAreaView>
    )
})

export default withScreen({ header: false })(SignInScreen)
