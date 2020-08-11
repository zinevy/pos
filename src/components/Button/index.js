import React, { memo } from "react"
import styled from "@emotion/native"

import { normalize } from "../../../utils/scale"

const Text = styled.Text(({ theme }) => ({
    color: theme.login.button.color,
}))

const ButtonLayout = styled.TouchableOpacity(({ theme, disabled }) => ({
    backgroundColor: disabled ? "#CCC" : theme.login.button.backgroundColor,
    borderRadius: normalize(16),
    touchAction: "none",
    height: theme.button.height,
}))

const SecondaryButtonLayout = styled.TouchableOpacity(({ theme, disabled }) => ({
    backgroundColor: disabled ? "#CCC" : "#FFF",
    borderWidth: 3,
    borderColor: "#EEE",
    borderRadius: normalize(16),
    touchAction: "none",
    height: theme.button.height,
}))

const Container = styled.View({
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
})

const ButtonText = styled(Text)(({ theme, secondary }) => ({
    fontSize: normalize(12),
    textAlign: "center",
    fontWeight: "bold",
    color: secondary ? "#7b7b7b" : "#FFF",
    fontFamily: theme.fontFamily.regular,
}))

export const SecondaryButton = memo(
    ({ disabled, loading, onPress, processing, title, children, secondary, ...rest }) => {
        return (
            <SecondaryButtonLayout disabled={disabled} onPress={onPress} style={{ ...rest.buttonStyle }}>
                {children}
            </SecondaryButtonLayout>
        )
    }
)

export const PrimaryButton = memo(({ disabled, loading, onPress, processing, title, children, secondary, ...rest }) => {
    return (
        <ButtonLayout disabled={disabled} onPress={onPress} style={{ ...rest.buttonStyle }}>
            <Container style={{ ...rest.containerStyle }}>
                {loading && !processing && <ButtonText style={{ ...rest.textStyle }}>Loading...</ButtonText>}
                {loading && processing && <ButtonText style={{ ...rest.textStyle }}>Processing</ButtonText>}
                {!loading && <ButtonText style={{ ...rest.textStyle }}>{title}</ButtonText>}
            </Container>
        </ButtonLayout>
    )
})
