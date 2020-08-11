import styled from "@emotion/native"
import { View } from "react-native"

import { normalize } from "../../../../utils/scale"

export const Text = styled.Text(({ theme }) => ({
    color: theme.main.color,
    fontFamily: theme.fontFamily.regular,
}))

export const FormContainer = styled(View)({
    padding: normalize(20),
    paddingTop: 0,
    paddingBottom: normalize(20),
    flexDirection: "column",
    height: "100%",
})

export const FormWrapper = styled(View)({
    flexDirection: "row",
    flexGrow: 1,
})

export const FormItemDetails = styled(View)({
    width: "30%",
})

export const FormSection = styled(View)({
    flexGrow: 1,
    paddingLeft: normalize(10),
    paddingRight: normalize(10),
    flex: 1,
})

export const FormToolbar = styled(View)(({ theme }) => ({
    height: theme.button.height,
    justifyContent: "flex-end",
}))
