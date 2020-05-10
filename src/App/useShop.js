import { useEffect, useState, useCallback, useMemo } from "react"
import { AsyncStorage } from "react-native"

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
        async (item) => {
            let userItems
            try {
                userItems = [...items, item]
                await AsyncStorage.setItem(key, JSON.stringify(userItems))
            } catch (err) {
                console.warn(err)
            } finally {
                setItems(userItems)
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
            removeItem,
        }),
        [items, key]
    )
}

export default useShop
