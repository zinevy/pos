import React, { useEffect, useState, useMemo, useRef } from "react"
import { Image, View, Text } from "react-native"
import * as FileSystem from "expo-file-system"
import * as Crypto from "expo-crypto"

const LazyImage = ({ source, ...rest }) => {
    const [imgURI, setImageURI] = useState()
    const timer = useRef()

    const getImageFilesystemKey = async (remoteURI) => {
        const hashed = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, remoteURI)
        return `${FileSystem.cacheDirectory}${hashed}`
    }

    useEffect(() => {
        clearTimeout(timer.current)
        const getImage = async () => {
            const filesystemURI = await getImageFilesystemKey(source.uri)
            await loadImage(filesystemURI, source.uri)
        }

        timer.current = setTimeout(() => {
            getImage()
        }, 500)
    }, [source])

    const loadImage = async (filesystemURI, remoteURI) => {
        try {
            const metadata = await FileSystem.getInfoAsync(filesystemURI)

            if (metadata.exists) {
                setImageURI(filesystemURI)
                return
            }

            const imageObject = await FileSystem.downloadAsync(remoteURI, filesystemURI)
            setImageURI(imageObject.uri)
        } catch (err) {
            console.log("Image loading error:", err)
            setImageURI(remoteURI)
        }
    }

    return useMemo(() => {
        return (
            <View style={{ ...rest.style, backgroundColor: "#CCC" }}>
                {!imgURI && (
                    <View style={{ ...rest.style, alignItems: "center", justifyContent: "center" }}>
                        <Text>...</Text>
                    </View>
                )}
                {imgURI && (
                    <View>
                        <Image source={{ uri: imgURI }} {...rest} />
                    </View>
                )}
            </View>
        )
    }, [imgURI])
}

export default LazyImage
