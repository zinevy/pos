import React, { Fragment, useContext, useCallback, memo } from "react"
import { View, SafeAreaView } from "react-native"
import styled from "@emotion/native"
import useSWR from "swr"

import { normalize } from "../../../utils/scale"
import { AppContext } from "../../Main"
import LoginForm from "../../components/Forms/Login"
import withScreen from "../../../utils/hoc/createScreen"
import device from "../../../utils/device"
import { DEVELOPER, VERSION } from "../../../env.json"
import { methods } from "./methods"

const LeftWrapper = styled.View({
    width: "40%",
    paddingRight: normalize(20),
})

const SeparatorContainer = styled.View(({ theme }) => ({
    flexDirection: "row",
    justifyContent: "center",
    height: "60%",
}))

const Separator = styled.View(({ theme }) => ({
    width: 2,
    backgroundColor: theme.login.field.borderColor,
}))

const Text = styled.Text(({ theme, type = "regular" }) => ({
    color: theme.login.field.color,
    fontFamily: theme.fontFamily[type],
}))

const DevTitle = styled.Text(({ theme }) => ({
    fontFamily: theme.fontFamily.bold,
    fontSize: normalize(50),
    marginBottom: normalize(20),
    color: theme.login.field.color,
}))

const fetchBranches = async () => {
    const response = await methods.getBranches()
    const jsonResponse = response.data

    if (response.ok) {
        const item = jsonResponse.data

        return item
    }

    return {}
}

const SignInScreen = memo(({ navigation }) => {
    const { appState, actions, dispatch } = useContext(AppContext)
    const { client, isLoading, isProcessing, isError } = appState
    const { data: branches, error: branchError } = useSWR("branches", fetchBranches, {
        shouldRetryOnError: true,
    })

    const signIn = (values) => {
        if (branches) {
            const selectedBranch = branches[values.branch_id]
            values = {
                ...values,
                branch_id: selectedBranch.id,
            }
            actions.signIn(values)
        }
    }

    if (branchError) {
        return (
            <View>
                <Text>Error</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center", backgroundColor: "#2a363f", height: "100%" }}>
            {!appState.userToken && (
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            width: "80%",
                            alignItems: "center",
                        }}>
                        <LeftWrapper style={{ alignItems: "center" }}>
                            <View
                                style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: "100%",
                                    flex: 1,
                                }}>
                                <DevTitle>{DEVELOPER}</DevTitle>
                            </View>
                        </LeftWrapper>
                        {branches && (
                            <Fragment>
                                <SeparatorContainer style={{ width: "20%" }}>
                                    <Separator />
                                </SeparatorContainer>
                                <View style={{ minWidth: "40%", flex: 1, paddingTop: 0, paddingBottom: 0 }}>
                                    <LoginForm
                                        onSubmit={signIn}
                                        error={appState.error}
                                        hasError={isError}
                                        disabled={isLoading}
                                        loading={isLoading && client === "email"}
                                        processing={isProcessing}
                                        branches={branches}
                                    />
                                </View>
                            </Fragment>
                        )}
                    </View>
                    <View style={{ marginTop: normalize(50) }}>
                        {device(["android", "ios"]) && (
                            <View style={{ alignItems: "center", marginTop: 10 }}>
                                <Text style={{ fontSize: 13 }}>v{VERSION}</Text>
                                <Text type="bold" style={{ fontSize: 14 }}>
                                    Powered by {DEVELOPER}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            )}
        </SafeAreaView>
    )
})

export default withScreen({ header: false })(SignInScreen)
