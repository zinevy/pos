import React, { memo, createContext, Fragment, useMemo } from "react"
import { Platform, StatusBar } from "react-native"
import { ThemeProvider } from "emotion-theming"
import { SafeAreaProvider } from "react-native-safe-area-context"

import useDarkMode from "../utils/hooks/useDarkMode"
import useAppReducer from "./App/useAppReducer"
import RootNavigator from "./RootNavigator"

import theme from "../utils/theme"
import useShop from "./App/useShop"

export const AppContext = createContext()

const MainApp = memo(() => {
    const [activeTheme, toggleTheme] = useDarkMode()
    const [appState, actions, dispatch] = useAppReducer()
    const { items, addToCart, removeItem } = useShop({
        key: appState.key,
    })

    const values = useMemo(
        () => ({
            appState,
            actions,
            activeTheme,
            toggleTheme,
            items,
            addToCart,
            removeItem,
            dispatch,
        }),
        [appState, actions, activeTheme, items]
    )

    return useMemo(() => {
        return (
            <AppContext.Provider value={values}>
                <ThemeProvider theme={theme[activeTheme]}>
                    <SafeAreaProvider>
                        <Fragment>
                            {Platform.OS === "ios" && (
                                <StatusBar barStyle={`${activeTheme === "light" ? "dark" : "light"}-content`} />
                            )}
                            <RootNavigator app={appState} />
                        </Fragment>
                    </SafeAreaProvider>
                </ThemeProvider>
            </AppContext.Provider>
        )
    }, [appState, actions, activeTheme, items])
})

export default MainApp
