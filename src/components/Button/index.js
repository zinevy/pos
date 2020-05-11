import React, { memo } from "react"
import styled from "@emotion/native"
import { normalize } from "../../../utils/scale"

const Text = styled.Text(({ theme }) => ({
    color: theme.login.button.color,
}))

const ButtonLayout = styled.TouchableOpacity(({ theme }) => ({
    backgroundColor: theme.login.button.backgroundColor,
    marginTop: normalize(5),
    marginBottom: normalize(5),
    borderRadius: normalize(10),
    touchAction: "none",
}))

const Container = styled.View({
    padding: normalize(17),
})
const ButtonText = styled(Text)({
    fontSize: normalize(14),
    textAlign: "center",
    fontWeight: "bold",
})

const Button = memo(({ disabled, loading, onPress, processing, title, ...rest }) => {
    return (
        <ButtonLayout disabled={disabled} onPress={onPress}>
            <Container style={{ ...rest.containerStyle }}>
                {loading && !processing && <ButtonText style={{ ...rest.textStyle }}>Loading...</ButtonText>}
                {loading && processing && <ButtonText style={{ ...rest.textStyle }}>Processing</ButtonText>}
                {!loading && <ButtonText style={{ ...rest.textStyle }}>{title}</ButtonText>}
            </Container>
        </ButtonLayout>
    )
})

export default Button
