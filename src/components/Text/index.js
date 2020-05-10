import React from "react"
import styled from "@emotion/native"

const defaultProps = {
    lines: 2,
}

const RNText = styled.Text(({ theme }) => ({
    color: theme.main.color,
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
