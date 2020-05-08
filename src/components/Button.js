import React, { memo } from "react"
import styled from "@emotion/native"
import { View } from "react-native"

const Text = styled.Text(({ theme }) => ({}))

const ButtonLayout = styled.TouchableOpacity({
    backgroundColor: "#000",
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 24,
    touchAction: "none",
})

const Container = styled.View({
    padding: 17,
})
const ButtonText = styled(Text)({
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
})

const Button = memo(({ loading, onPress, processing, title }) => {
    return (
        <ButtonLayout disabled={loading} onPress={onPress}>
            <Container>
                {loading && !processing && <ButtonText>Loading...</ButtonText>}
                {loading && processing && <ButtonText>Processing</ButtonText>}
                {!loading && <ButtonText>{title}</ButtonText>}
            </Container>
        </ButtonLayout>
    )
})

export default Button
