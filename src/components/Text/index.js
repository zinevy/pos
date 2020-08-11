import React from "react"
import styled from "@emotion/native"

const defaultProps = {
    lines: 2,
}

const RNText = styled.Text(({ theme, bold }) => ({
    color: theme.main.color,
    fontSize: 14,
    fontFamily: bold ? theme.fontFamily.bold : theme.fontFamily.regular,
}))

const Text = ({ children, lines, bold, ...rest }) => {
    return (
        <RNText bold={bold} numberOfLines={lines} ellipsizeMode="tail" {...rest}>
            {children}
        </RNText>
    )
}

Text.defaultProps = defaultProps

export default Text
