import React, { useContext, useEffect, memo } from "react"
import { View } from "react-native"
import styled from "@emotion/native"

import withScreen from "../../utils/hoc/createScreen"
import { AppContext } from "../Main"

const Text = styled.Text(({ theme }) => ({
    color: theme.main.color,
}))

const Title = styled(Text)({
    fontSize: 20,
})

const Wrapper = styled(View)({
    alignItems: "center",
})

const Links = memo(() => {
    const { appState } = useContext(AppContext)

    return (
        <Wrapper>
            <Title>This is a Link page - {appState.userToken}</Title>
        </Wrapper>
    )
})

export default withScreen()(Links)
