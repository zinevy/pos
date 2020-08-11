import React from "react"

import { PrimaryButton } from "../../../components/Button"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "emotion-theming"

export const CancelButton = () => {
    const navigation = useNavigation()
    const theme = useTheme()

    const onCancel = () => navigation.goBack()

    return (
        <PrimaryButton
            buttonStyle={{
                width: "30%",
                backgroundColor: theme.buttons.secondary.backgroundColor,
                borderWidth: 2,
                borderColor: theme.buttons.secondary.borderColor,
            }}
            textStyle={{ color: theme.buttons.secondary.color }}
            title="Cancel"
            onPress={onCancel}
        />
    )
}
