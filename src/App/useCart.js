import { useMemo, useEffect, useReducer } from "react"
import { AsyncStorage } from "react-native"

const initialState = { items: [] }

const reducer = (prevState, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            return { items: [...prevState.items, action.item] }
        case "UPDATE_ITEMS":
            return { items: action.items }
        case "REMOVE_ITEM":
            const items = prevState.items.filter((item, cartItemIndex) => cartItemIndex !== action.index)
            return { items }
        default:
            throw new Error()
    }
}

const useCart = ({ key }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        const rehydrate = async () => {
            let userItems
            if (key) {
                try {
                    userItems = await AsyncStorage.getItem(JSON.stringify(key))
                    console.log(userItems)
                    userItems = JSON.parse(userItems)

                    if (userItems) {
                        dispatch({ type: "UPDATE_ITEMS", items: userItems })
                    }
                } catch (e) {
                    console.log("ERROR", e)
                }
            }
        }

        rehydrate()
    }, [key])

    // useEffect(() => {
    //     const update = async () => {
    //         let userItems
    //         if (key) {
    //             try {
    //                 userItems = await AsyncStorage.setItem(JSON.stringify(key), JSON.stringify(state.items))
    //             } catch (e) {
    //                 console.log("ERROR", e)
    //             }
    //         }
    //     }
    //     update()
    // }, [state, key])

    const actions = useMemo(
        () => ({
            addToCart: async (item, options = {}) => {
                const items = [...state.items, item]
                await AsyncStorage.setItem(JSON.stringify(key), JSON.stringify(items))
                dispatch({ type: "ADD_ITEM", item })
                if (typeof options.onSuccess === "function") {
                    options.onSuccess()
                }
            },
            removeItem: (index) => {
                dispatch({ type: "REMOVE_ITEM", index })
            },
        }),
        [state, key]
    )

    return [state, actions, dispatch]
}

export default useCart
