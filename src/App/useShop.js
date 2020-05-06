import { useEffect, useState, useCallback, useMemo } from "react"
import { AsyncStorage } from "react-native"

const useShop = ({ token }) => {
    const [state, setState] = useState({})

    const removeItem = useCallback(
        async (index) => {
            let items = getUserItems()

            items = items.filter((item, cartItemIndex) => cartItemIndex !== index)

            const userItems = {
                ...state,
                [token]: {
                    items,
                },
            }

            await AsyncStorage.setItem("@items", JSON.stringify(userItems))

            setState(userItems)
        },
        [state, token]
    )

    const getUserItems = useCallback(() => {
        let items = []
        if (token && state && state[token]) {
            items = state[token].items
        }

        return items
    }, [state, token])

    const addToCart = useCallback(
        async (item) => {
            let userItems
            try {
                if (state && state[token]) {
                    userItems = {
                        ...state,
                        [token]: {
                            items: [...state[token].items, item],
                        },
                    }
                } else {
                    userItems = {
                        ...state,
                        [token]: {
                            items: [item],
                        },
                    }
                }

                await AsyncStorage.setItem("@items", JSON.stringify(userItems))
                // const ITEMS = await AsyncStorage.getItem("@items")
                // console.log("ITEMS", ITEMS)
            } catch (err) {
                console.warn(err)
            } finally {
                setState({ ...userItems })
            }
        },
        [state, token]
    )

    useEffect(() => {
        const bootstrapAsync = async () => {
            let userItems

            try {
                userItems = await AsyncStorage.getItem("@items")
                userItems = JSON.parse(userItems)

                setState(userItems)
            } catch (e) {
                // eslint-disable-next-line no-console
                console.log("ERROR", e)
            }
        }

        bootstrapAsync()
    }, [token])

    return useMemo(() => {
        const items = getUserItems()

        return {
            items,
            addToCart,
            removeItem,
        }
    }, [state, token])
}

export default useShop
