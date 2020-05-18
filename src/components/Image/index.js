import React, { useState } from "react"
import { Image, View, Text } from "react-native"

const LazyImage = ({ source, ...rest }) => {
    const [loading, setLoading] = useState()

    return (
        <View style={{ ...rest.style, backgroundColor: "#CCC", position: "relative" }}>
            {loading && (
                <View style={{ ...rest.style, alignItems: "center", justifyContent: "center", position: "absolute" }}>
                    <Text>Loading...</Text>
                </View>
            )}

            <View>
                <Image
                    source={source}
                    {...rest}
                    onLoadStart={() => {
                        setLoading(true)
                    }}
                    onLoad={() => {
                        setLoading(false)
                    }}
                />
            </View>
        </View>
    )
}

export default LazyImage
