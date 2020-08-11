import { useEffect, useState, useCallback, useMemo } from "react"
import AsyncStorage from "@react-native-community/async-storage"

const useShop = ({ key }) => {
    const [items, setItems] = useState([])

    const removeItem = useCallback(
        async (index) => {
            let userItems

            userItems = items.filter((item, cartItemIndex) => cartItemIndex !== index)

            try {
                await AsyncStorage.setItem(key, JSON.stringify(userItems))
                setItems(userItems)
            } catch (error) {}
        },
        [items, key]
    )

    const addToCart = useCallback(
        async (item, options = {}) => {
            let userItems = items

            try {
                const result = items.find((res) => {
                    return (
                        res.type === item.type &&
                        res.product_id === item.product_id &&
                        JSON.stringify(res.add_ons) === JSON.stringify(item.add_ons)
                    )
                })

                if (result) {
                    const index = userItems.indexOf(result)
                    result.quantity = Number(result.quantity) + Number(item.quantity)
                    userItems = userItems.map((value, i) => {
                        if (index === i) value = result
                        return value
                    })
                } else {
                    userItems = [...userItems, item]
                }

                await AsyncStorage.setItem(key, JSON.stringify(userItems))
            } catch (err) {
                console.warn(err)
            } finally {
                setItems(userItems)
                if (typeof options.onSuccess === "function") {
                    options.onSuccess()
                }
            }
        },
        [items, key]
    )

    const clearCartItems = useCallback(
        async (options = {}) => {
            let userItems = []

            try {
                await AsyncStorage.setItem(key, JSON.stringify(userItems))
            } catch (err) {
                console.warn(err)
            } finally {
                setItems(userItems)
                if (typeof options.onSuccess === "function") {
                    options.onSuccess()
                }
            }
        },
        [items, key]
    )

    const updateCart = useCallback(
        async (item, options = {}) => {
            let userItems = items

            try {
                const result = items.find((res, index) => index === item.index)

                if (result) {
                    userItems = userItems.map((value, i) => {
                        if (item.index === i) {
                            value = item
                        }
                        return value
                    })
                }
                await AsyncStorage.setItem(key, JSON.stringify(userItems))
            } catch (err) {
                console.warn(err)
            } finally {
                setItems(userItems)
                if (typeof options.onSuccess === "function") {
                    options.onSuccess()
                }
            }
        },
        [items, key]
    )

    useEffect(() => {
        const bootstrapAsync = async () => {
            let userItems
            if (key) {
                try {
                    userItems = await AsyncStorage.getItem(key)
                    userItems = JSON.parse(userItems)

                    if (userItems) {
                        setItems(userItems)
                    }
                } catch (e) {
                    console.log("ERROR", e)
                }
            }
        }

        bootstrapAsync()
    }, [key])

    return useMemo(
        () => ({
            items,
            addToCart,
            clearCartItems,
            updateCart,
            removeItem,
        }),
        [items, key]
    )
}

export default useShop
