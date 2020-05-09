import React, { memo } from "react"

import withScreen from "../../utils/hoc/createScreen"
import Cart from "./Cart"

const Checkout = memo(({ navigation }) => {
    return <Cart navigation={navigation} />
})

export default withScreen({ cart: false, back: false })(Checkout)
