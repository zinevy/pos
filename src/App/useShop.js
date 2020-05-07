import { useEffect, useState, useCallback, useMemo } from "react"
import { AsyncStorage } from "react-native"

const useShop = ({ key }) => {
    const [state, setState] = useState({})

    const removeItem = useCallback(
        async (index) => {
            let items = getUserItems()

            items = items.filter((item, cartItemIndex) => cartItemIndex !== index)

            const userItems = {
                ...state,
                [key]: {
                    items,
                },
            }

            await AsyncStorage.setItem("@items", JSON.stringify(userItems))

            setState(userItems)
        },
        [state, key]
    )

    const getUserItems = useCallback(() => {
        let items = []
        if (key && state && state[key]) {
            items = state[key].items
        }

        return items
    }, [state, key])

    const addToCart = useCallback(
        async (item) => {
            let userItems
            try {
                if (state && state[key]) {
                    userItems = {
                        ...state,
                        [key]: {
                            items: [...state[key].items, item],
                        },
                    }
                } else {
                    userItems = {
                        ...state,
                        [key]: {
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
        [state, key]
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
    }, [key])

    return useMemo(() => {
        const items = getUserItems()

        return {
            items,
            addToCart,
            removeItem,
        }
    }, [state, key])
}

export default useShop
