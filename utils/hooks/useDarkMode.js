import { useEffect, useState } from "react"
import { AsyncStorage } from "react-native"

const useDarkMode = () => {
    const [activeTheme, setTheme] = useState("light")

    const toggleTheme = async () => {
        if (activeTheme === "light") {
            await AsyncStorage.setItem("@theme", "dark")
            setTheme("dark")
        } else {
            await AsyncStorage.setItem("@theme", "light")
            setTheme("light")
        }
    }

    const pullFromStorage = async () => {
        const localTheme = await AsyncStorage.getItem("@theme")

        if (localTheme) {
            setTheme(localTheme)
        }
    }

    useEffect(() => {
        pullFromStorage()

        return () => {}
    }, [])

    return [activeTheme, toggleTheme]
}

export default useDarkMode
