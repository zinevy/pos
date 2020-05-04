import React, { memo, useContext } from "react"
import { View } from "react-native"

import AppContext from "../../src/Main"

const withAppContext = (mapContext) => (InnerComponent) => {
    const Screen = (props) => {
        const context = useContext(AppContext)
        console.log("context", context)

        if (context) {
            console.log(context)
        }

        // if (mapContext(context)) {
        //     return <InnerComponent {...props} {...mapContext(context)} />
        // }

        return <View />
    }

    return Screen
}

export default withAppContext
