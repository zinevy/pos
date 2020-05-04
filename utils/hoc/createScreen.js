import React, { memo } from "react"
import { StyleSheet, ScrollView, SafeAreaView } from "react-native"
import styled from "@emotion/native"

import Header from "../../src/components/Header"
import { useTheme } from "emotion-theming"

const ScrollViewContainer = styled(ScrollView)({
    flex: 1,
})

const styles = StyleSheet.create({
    contentContainer: {
        paddingTop: 10,
    },
})

const withScreen = ({ header = null } = {}) => (InnerComponent) => {
    const HomeScreen = memo((props) => {
        const theme = useTheme()

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.main.backgroundColor }}>
                <Header navigation={props.navigation} />
                <ScrollViewContainer contentContainerStyle={styles.contentContainer}>
                    <InnerComponent {...props} />
                </ScrollViewContainer>
            </SafeAreaView>
        )
    })

    HomeScreen.navigationOptions = {
        header,
    }

    return HomeScreen
}

export default withScreen
