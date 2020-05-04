import { useEffect, useState, useCallback, useMemo } from "react"
import { AsyncStorage } from "react-native"

const useShop = () => {
    const [state, setState] = useState({ items: [] })

    const addToCart = useCallback(
        async (item) => {
            const items = [...state.items, item]
            try {
                await AsyncStorage.setItem("@items", JSON.stringify(items))
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
            let items
            try {
                items = await AsyncStorage.getItem("@items")
            } catch (e) {
                // eslint-disable-next-line no-console
                console.log("ERROR", e)
            } finally {
                items = items && JSON.parse(items)
                if (items) {
                    setState({ items })
                }
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
