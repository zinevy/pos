import React from "react"
import styled from "@emotion/native"
import { normalize } from "../../../utils/scale"

const defaultProps = {
    lines: 2,
}

const RNText = styled.Text(({ theme }) => ({
    color: theme.main.color,
    fontSize: normalize(14),
}))

const Text = ({ children, lines, ...rest }) => {
    return (
        <RNText numberOfLines={lines} ellipsizeMode="tail" {...rest}>
            {children}
        </RNText>
    )
}

Text.defaultProps = defaultProps

export default Text
