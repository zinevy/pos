import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import Products from "../Products"
import AddProduct from "../Products/AddProduct"
import EditProduct from "../Products/EditProduct"
import Inventory from "../Inventory"
import AddTransactionHistory from "../Inventory/AddTransactionHistory"

const ProductsStack = createStackNavigator()
const ProductsStackScreen = () => {
    return (
        <ProductsStack.Navigator screenOptions={{ headerMode: "none", headerShown: false }}>
            <ProductsStack.Screen name="Products" component={Products} />
            <ProductsStack.Screen name="AddProductPage" component={AddProduct} />
            <ProductsStack.Screen name="EditProductPage" component={EditProduct} />
            <ProductsStack.Screen name="InventoryPage" component={Inventory} />
            <ProductsStack.Screen name="AddTransactionHistoryPage" component={AddTransactionHistory} />
        </ProductsStack.Navigator>
    )
}

export default ProductsStackScreen
