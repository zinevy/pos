import { useEffect, useState, useCallback, useMemo } from "react"
import { AsyncStorage } from "react-native"

const useShop = () => {
    const [state, setState] = useState({ items: [] })

    const addToCart = useCallback(
        async (item) => {
            const token = await AsyncStorage.getItem("@token")
            let cartItems = await AsyncStorage.getItem("@items")

            const items = [...state.items, item]

            try {
                cartItems = JSON.parse(cartItems)

                const userItems = {
                    [token]: {
                        items,
                    },
                }

                cartItems = {
                    ...cartItems,
                    ...userItems,
                }

                await AsyncStorage.setItem("@items", JSON.stringify(cartItems))
            } catch (err) {
                // eslint-disable-next-line no-console
                console.fatal(err)
            } finally {
                setState({ items })
            }
        },
        [state.items]
    )

    useEffect(() => {
        const bootstrapAsync = async () => {
            const token = await AsyncStorage.getItem("@token")
            let userItems

            try {
                userItems = await AsyncStorage.getItem("@items")
                userItems = JSON.parse(userItems)

                if (userItems && userItems[token]) {
                    const items = userItems[token].items

                    setState({ items })
                }
            } catch (e) {
                // eslint-disable-next-line no-console
                console.log("ERROR", e)
            }
        }

        bootstrapAsync()
    }, [])

    return useMemo(
        () => ({
            items: state.items,
            addToCart,
        }),
        [state]
    )
}

export default useShop
