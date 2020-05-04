import React from "react"

import dynamic from "next/dynamic"

const MainApp = dynamic(() => import("../src/Main"), {
    ssr: false,
})

export default function App() {
    return <MainApp />
}
