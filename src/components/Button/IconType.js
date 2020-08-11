import React, { memo, useMemo } from "react"
import styled from "@emotion/native"
import { View } from "react-native"
// import { Ionicons } from "@expo/vector-icons"

import { toCurrency } from "../../../utils/formatter"
import { normalize } from "../../../utils/scale"

const Text = styled.Text(({ theme }) => ({
    color: theme.buttons.total.color,
}))

const ButtonLayout = styled.TouchableOpacity(({ theme, disabled }) => ({
    backgroundColor: disabled ? "#CCC" : theme.buttons.total.backgroundColor,
    borderRadius: normalize(16),
    touchAction: "none",
    height: normalize(60),
}))

const ButtonText = styled(Text)({
    fontSize: normalize(14),
    textAlign: "center",
    fontWeight: "bold",
})

const Container = styled.View({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    paddingLeft: normalize(10),
    paddingRight: normalize(15),
})

const IconType = memo(({ onPress, title, disabled, total }) => {
    return useMemo(() => {
        return (
            <ButtonLayout disabled={disabled} style={{ flexGrow: 1 }} onPress={onPress}>
                <Container>
                    <View
                        style={{
                            borderWidth: 1,
                            borderRadius: normalize(12),
                            borderColor: "rgba(255,255,255,0.4)",
                            padding: normalize(12),
                            minWidth: normalize(150),
                        }}>
                        <ButtonText>{title}</ButtonText>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <ButtonText style={{ lineHeight: normalize(18), marginRight: 16 }}>
                            {toCurrency(total)}
                        </ButtonText>
                        {/* <Ionicons name="ios-arrow-forward" size={normalize(18)} color="white" /> */}
                    </View>
                </Container>
            </ButtonLayout>
        )
    }, [total, disabled, title])
})

export default IconType
