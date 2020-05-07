import React, { useContext, memo } from "react"
import { View, Button } from "react-native"
import styled from "@emotion/native"

import withScreen from "../../utils/hoc/createScreen"
import { AppContext } from "../Main"

const Text = styled.Text(({ theme }) => ({
    color: theme.main.color,
}))

const Settings = memo(() => {
    const { activeTheme, toggleTheme } = useContext(AppContext)

    return (
        <View>
            <Button title={activeTheme === "light" ? "Dark Mode" : "Light Mode"} onPress={toggleTheme} />
        </View>
    )
})

export default withScreen({ cart: false, back: false })(Settings)
