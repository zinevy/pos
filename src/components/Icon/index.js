import React from "react"
import { Icon } from "react-native-elements"
import { useTheme } from "emotion-theming"

const AppIcon = ({ name, type, ...rest }) => {
    const theme = useTheme()
    return <Icon name={name} type={type} {...rest} color={theme.main.color} />
}

export default AppIcon
