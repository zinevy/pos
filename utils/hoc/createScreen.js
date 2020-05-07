import React, { memo } from "react"
import { StyleSheet, ScrollView, View } from "react-native"
import styled from "@emotion/native"
import { useSafeArea } from "react-native-safe-area-context"

import Header from "../../src/components/Header"

const ScreenView = styled.View(({ theme }) => ({
    backgroundColor: theme.main.backgroundColor,
}))

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
    },
})

const withScreen = ({ header = true, cart = true, back = true } = {}) => (InnerComponent) => {
    const HomeScreen = memo((props) => {
        const insets = useSafeArea()

        return (
            <ScreenView style={{ flex: 1, paddingTop: insets.top }}>
                {header && <Header navigation={props.navigation} withBack={back} withCart={cart} />}
                <InnerComponent {...props} />
            </ScreenView>
        )
    })

    return HomeScreen
}

export default withScreen
