import React, { memo } from "react"

import withScreen from "../../utils/hoc/createScreen"
import Cart from "./Sales/Cart"

const CartPage = memo(({ navigation }) => {
    return <Cart navigation={navigation} />
})

export default withScreen({ cart: false })(CartPage)
