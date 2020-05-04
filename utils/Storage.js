import * as Crypto from "expo-crypto"

const encrypt = async (string, token) => {
    const text = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, JSON.stringify(string))
    console.log("Text", text.toString())
    return text.toString()
}

const decrypt = async (string, token) => {
    const text = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, string)

    return text
}

const Storage = {
    encrypt,
    decrypt,
}

export default Storage
