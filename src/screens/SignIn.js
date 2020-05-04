import React, { useContext, useCallback, memo, useEffect } from "react"
import { TouchableOpacity, SafeAreaView, Text } from "react-native"

import { AppContext } from "../Main"
import LoginForm from "../components/Forms/Login"

const SignInScreen = memo(({ navigation }) => {
    const { appState, authContext, dispatch } = useContext(AppContext)

    useEffect(() => {
        dispatch({ type: "INIT" })

        return () => {}
    }, [])

    const onSubmit = useCallback((values) => {
        authContext.signIn(values)
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
        </SafeAreaView>
    )
})

export default SignInScreen
