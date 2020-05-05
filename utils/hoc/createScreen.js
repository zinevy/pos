import React, { memo } from "react"
import { StyleSheet, ScrollView, View } from "react-native"
import styled from "@emotion/native"
import { useSafeArea } from "react-native-safe-area-context"

import Header from "../../src/components/Header"

const ScreenView = styled.View(({ theme }) => ({
    backgroundColor: theme.main.backgroundColor,
}))

const ScrollViewContainer = styled(ScrollView)({
    flex: 1,
})

const styles = StyleSheet.create({
    contentContainer: {},
})

const withScreen = ({ header = true } = {}) => (InnerComponent) => {
    const HomeScreen = memo((props) => {
        const insets = useSafeArea()

        return (
            <ScreenView style={{ flex: 1, paddingTop: insets.top }}>
                {header && <Header navigation={props.navigation} />}
                <ScrollViewContainer contentContainerStyle={styles.contentContainer}>
                    <InnerComponent {...props} />
                </ScrollViewContainer>
            </ScreenView>
        )
    })

    return HomeScreen
}

export default withScreen
