import React, { memo } from "react"
import { StyleSheet, ScrollView, View } from "react-native"
import styled from "@emotion/native"
import { useSafeArea } from "react-native-safe-area-context"

import Header from "../../src/components/Header"
import { useTheme } from "emotion-theming"

const ScrollViewContainer = styled(ScrollView)({
    flex: 1,
})

const styles = StyleSheet.create({
    contentContainer: {},
})

const withScreen = ({ header = true } = {}) => (InnerComponent) => {
    const HomeScreen = memo((props) => {
        const theme = useTheme()
        const insets = useSafeArea()

        return (
            <View style={{ flex: 1, backgroundColor: theme.main.backgroundColor, paddingTop: insets.top }}>
                {header && <Header navigation={props.navigation} />}
                <ScrollViewContainer contentContainerStyle={styles.contentContainer}>
                    <InnerComponent {...props} />
                </ScrollViewContainer>
            </View>
        )
    })

    return HomeScreen
}

export default withScreen
