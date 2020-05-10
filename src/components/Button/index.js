import React, { memo } from "react"
import styled from "@emotion/native"

const Text = styled.Text(({ theme }) => ({
    color: theme.login.button.color,
}))

const ButtonLayout = styled.TouchableOpacity(({ theme }) => ({
    backgroundColor: theme.login.button.backgroundColor,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 24,
    touchAction: "none",
}))

const Container = styled.View({
    padding: 17,
})
const ButtonText = styled(Text)({
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
})

const Button = memo(({ disabled, loading, onPress, processing, title }) => {
    return (
        <ButtonLayout disabled={disabled} onPress={onPress}>
            <Container>
                {loading && !processing && <ButtonText>Loading...</ButtonText>}
                {loading && processing && <ButtonText>Processing</ButtonText>}
                {!loading && <ButtonText>{title}</ButtonText>}
            </Container>
        </ButtonLayout>
    )
})

export default Button
