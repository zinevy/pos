import React, { useContext, memo, useMemo } from "react"
import { View, ScrollView } from "react-native"

import { AppContext } from "../Main"
import withScreen from "../../utils/hoc/createScreen"

import { Text, LazyImage } from "../components/"
import { normalize } from "../../utils/scale"
import Items from "./Products/Items"

const Home = memo(() => {
    const { activeTheme, appState } = useContext(AppContext)

    return useMemo(() => {
        return <ScrollView style={{ marginTop: normalize(20) }}>{/* <Items /> */}</ScrollView>
    }, [activeTheme, appState])
})

export default withScreen({ back: false })(Home)
