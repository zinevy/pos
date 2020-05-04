import React, { useContext, useCallback, memo, useEffect } from "react"
import { SafeAreaView, TouchableOpacity, Text } from "react-native"
import { useIsFocused } from "@react-navigation/native"

import { AppContext } from "../Main"
import RegistrationForm from "../components/Forms/Registration"

const Registration = memo(({ navigation }) => {
    const { appState, authContext, dispatch } = useContext(AppContext)
    const isFocused = useIsFocused()

    useEffect(() => {
        dispatch({ type: "INIT" })
    }, [isFocused])

    const onSubmit = useCallback((values) => {
        authContext.register(values)
    }, [])

    return (
        <SafeAreaView>
            <RegistrationForm
                onSubmit={onSubmit}
                error={appState.error}
                hasError={appState.isError}
                loading={appState.isLoading}
            />
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("SignIn")
                }}>
                <Text>Login here</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
})

export default Registration
