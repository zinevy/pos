import React, { useContext, useEffect, memo } from "react"
import { Text, View } from "react-native"
import styled from "@emotion/native"

import withScreen from "../../utils/hoc/createScreen"
import { AppContext } from "../Main"

const Title = styled(Text)(({ theme }) => ({
    fontSize: 20,
    color: theme.main.color,
}))

const Wrapper = styled(View)({
    alignItems: "center",
})

const Links = memo(() => {
    const { appState } = useContext(AppContext)

    useEffect(() => {
        console.log("appState", appState)
    }, [appState])

    return (
        <Wrapper>
            <Title>This is a Link page - {appState.userToken}</Title>
        </Wrapper>
    )
})

export default withScreen()(Links)
