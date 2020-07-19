import React, { memo, useContext } from "react"

import { AppContext } from "../../src/Main"

const withAppContext = (mapContext) => (InnerComponent) => {
    const Page = memo((props) => {
        const context = useContext(AppContext)
        const providerState = mapContext(context) ? mapContext(context) : {}

        return <InnerComponent {...props} {...providerState} />
    })

    return Page
}

export default withAppContext
